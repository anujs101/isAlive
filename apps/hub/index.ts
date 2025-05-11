import { randomUUIDv7, type ServerWebSocket } from "bun";
import type {IncomingMessage, SignupIncomingMessage} from "common/types"
import {prismaClient} from "db/client"
import axios from 'axios';
import nacl from "tweetnacl"
import nacl_util from "tweetnacl-util"
import { PublicKey } from "@solana/web3.js";
const availableValidators:{validatorId:string,socket:ServerWebSocket<unknown>,publicKey:string}[]=[];
const CALLBACKS:{[callbackId:string]:(data:IncomingMessage)=>void}={}
const COST_PER_VALIDATION = 100 // in lamports

Bun.serve({
    fetch(req,server){
        if(server.upgrade(req)){
            return;
        }
        return new Response("Responce failed",{status:500});
    },
    port:8081,
    websocket:{
        async message(ws:ServerWebSocket<unknown>,message:string){
            const data:IncomingMessage = JSON.parse(message);
            if(data.type==='signup'){
                const verify=await verifyMessage(`Signed message for ${data.data.callbackId}, ${data.data.publicKey}`,data.data.publicKey,data.data.signedMessage)
                if(verify){
                    await SignupHandler(ws,data.data);
                }
            } else if(data.type === 'validate'){
                const callback = CALLBACKS[data.data.callbackId];
                if (callback) {
                    callback(data);
                }
                delete CALLBACKS[data.data.callbackId];
            }
        },
        async close(ws:ServerWebSocket<unknown>){
            availableValidators.splice(availableValidators.findIndex(v => v.socket === ws),1);
        }
    },
});
async function SignupHandler(ws:ServerWebSocket<unknown>,{ ip, publicKey, signedMessage, callbackId }:SignupIncomingMessage){
    const validatorDB= await prismaClient.validator.findFirst({
        where:{
            publicKey
        }
    });
    if(validatorDB){
        console.log(`Validator already registered with ID: ${validatorDB.id}`);
        ws.send(JSON.stringify({
            type: 'signup', 
            data: {
                validatorId:validatorDB.id,
                callbackId,
            }
        }));
        availableValidators.push({
            validatorId:validatorDB.id,
            socket:ws,
            publicKey
        });
        return;
    } 
    const location = await getLocation(ip);
    console.log(location);
        const validator = await prismaClient.validator.create(
        {
            data:{
            ip,
            publicKey,
            location:'unknown'  //will later change the schema and update this to get the real location
            }
        }
        );
        console.log(`New Validator registered with ID: ${validator.id}`);
    

    ws.send(JSON.stringify({
        type:'signup',
        data:{
            callbackId,
            validatorId:validator.id
        },
    }));
    availableValidators.push({
        validatorId:validator.id,
        socket:ws,
        publicKey
    });

}

async function verifyMessage(message:string, publicKey:string, signedMessage:string){
    const messageBytes = nacl_util.decodeUTF8(message);
    const result = nacl.sign.detached.verify(
        messageBytes,
        new Uint8Array(JSON.parse(signedMessage)),
        new PublicKey(publicKey).toBytes(),
    );
    return result;
}

async function getLocation(ip:string){
    try {
    const response = await axios.get(`http://ip-api.com/json/${ip}`);
    const data = response.data;

    if (data.status === 'success') {
      return JSON.stringify({
        country: data.country,
        region: data.regionName,
        city: data.city,
        lat: data.lat,
        lon: data.lon,
        isp: data.isp,
      });
    } else {
      console.log('error: Invalid IP or API failure');
    }
  } catch (err) {
    console.error(err);
  }
}

// Add this at the end of the file, replacing the existing setInterval

// Wait for validators to register before starting validations
console.log("Waiting for validators to register before starting validations...");
setTimeout(() => {
  console.log("Starting validation interval...");
  setInterval(async ()=>{
      const websitesToMonitor = await prismaClient.website.findMany({
          where :{
              disabled:false
          }
      });
      for (const website of websitesToMonitor){
          availableValidators.forEach(validator=>{
              const callbackId = randomUUIDv7();
              console.log(`Calling validator ${validator.validatorId} to validate website ${website.url}`);
              validator.socket.send(JSON.stringify({
                  type :'validate',
                  data:{
                      callbackId,
                      url:website.url
                  }
              }));
              CALLBACKS[callbackId]= async (data:IncomingMessage)=>{
                  if(data.type==='validate'){
                      const {validatorId, status, latency, signedMessage} = data.data;
                      const verified = await verifyMessage(`Replying to ${callbackId}`,validator.publicKey,signedMessage);
                      if(!verified) {return;}
                      
                      // Skip creating websiteTick if validatorId is null
                      if(!validatorId) {
                          console.log(`Validation received but validatorId is null for website ${website.url}`);
                          return;
                      }
                      
                      await prismaClient.$transaction(async (tx)=>{
                          await tx.websiteTick.create({
                              data:{
                                  websiteId:website.id,
                                  validatorId,
                                  status,
                                  latency,
                                  createdAt: new Date(),
                              },
                          });
                          await tx.validator.update({
                              where:{
                                  id:validatorId
                              },
                              data:{
                                  pendingPayouts:{increment:COST_PER_VALIDATION}
                              },
                          })
                      })
                  }
              }
          })
      }
  },1*60*1000);
}, 10000); // 10 second delay to allow validators to register
