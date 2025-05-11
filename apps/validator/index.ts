import { Keypair } from "@solana/web3.js";
import type { OutgoingMessage, SignupOutgoingMessage, ValidateOutgoingMessage } from "common/types";
import bs58 from "bs58";
import { randomUUIDv7 } from "bun";
import nacl from "tweetnacl";
import nacl_util from "tweetnacl-util";
import axios from 'axios';
const CALLBACKS :{[callback:string]:(data:SignupOutgoingMessage)=>void}= {}
let validatorId :string|null = null;
const PORT= 8081;
async function main(){
const base58PrivateKey = process.env.PRIVATE_KEY;  



if (!base58PrivateKey) {
    throw new Error("PRIVATE_KEY environment variable is missing");
}

// Decode the Base58 private key to a byte array
const privateKeyBytes = bs58.decode(base58PrivateKey);

// Create the keypair from the decoded private key bytes
const keypair = Keypair.fromSecretKey(privateKeyBytes);
//creating a new websocket connection
const ws = new WebSocket(`ws://localhost:${PORT}`);

    ws.onmessage = async(event)=>{
        const data :OutgoingMessage = JSON.parse(event.data);
            if(data.type === 'signup'){
                CALLBACKS[data.data.callbackId]?.(data.data);
                delete CALLBACKS[data.data.callbackId];
            } else if (data.type==='validate'){
                await validateHandler(ws,data.data, keypair);
            }
    }
    ws.onopen = async(event)=>{
        const callbackId = randomUUIDv7();
        CALLBACKS[callbackId]=(data:SignupOutgoingMessage)=>{
            validatorId = data.validatorId;
            console.log(`Validator registered with ID: ${validatorId}`);
        }
        const signedMessage = await signMessage(`Signed message for ${callbackId}, ${keypair.publicKey}`, keypair)
        const ip = await getPublicIP();
        ws.send(JSON.stringify({
            type:'signup',
            data:{
                callbackId,
                ip,
                publicKey: keypair.publicKey,
                signedMessage,
            },
        }));
    }
}

async function validateHandler(ws:WebSocket,{url,callbackId,websiteId}:ValidateOutgoingMessage, keypair:Keypair){
    console.log(`validating ${url} with validatorId: ${validatorId}`);
const signature = await signMessage(`Replying to ${callbackId}`, keypair);
    try{
        const startTime = Date.now();
        const response = await fetch(url);
        const endTime = Date.now();
        const latency = endTime - startTime;
        const status = response.status;
        ws.send(JSON.stringify({
            type: 'validate',
            data: {
                callbackId,
                validatorId,
                websiteId,
                latency,
                status: status ===200 ?'Good':'Bad',
                signedMessage:signature
            }
        }));
        
    } catch(error){
        ws.send(JSON.stringify({
            type: 'validate',
            data: {
                callbackId,
                validatorId,
                websiteId,
                latency: -1,
                status:'Bad',
                signedMessage:signature
            }
        }));
        console.log(error);
    }
}
async function signMessage(message:string,keypair:Keypair){
    const messageBytes = nacl_util.decodeUTF8(message);
    const signature = nacl.sign.detached(messageBytes,keypair.secretKey);
    return (JSON.stringify(Array.from(signature)));
}

async function getPublicIP() {
  const res = await axios.get('https://api.ipify.org?format=json');
  return res.data.ip;
}

main();

setInterval(async () => {

}, 10000);