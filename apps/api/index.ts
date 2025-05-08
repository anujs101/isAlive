import express, { response } from "express";
import { authMiddleware } from "./middleware";
import { prismaClient } from "db/client";
import '@clerk/clerk-sdk-node';
import dotenv from 'dotenv';
dotenv.config();
const cors = require('cors');
const app = express();
const PORT = 8080;
app.use(express.json());
app.use(cors());
//add a website
app.post("/api/v1/website",authMiddleware, async (req, res) => {
 const userId = req.userId!;
    const url = req.body.url;
 const data = await prismaClient.website.create({
 data :{userId,
        url
    }
})
    res.json({
        id : data.id
    })
});
// get website status 
app.get("/api/v1/website/status",authMiddleware, async (req, res) => {
    const websiteId = req.query.websiteId as unknown as string;
    const userId = req.userId!;
    const data = await prismaClient.website.findFirst({
       where :{ 
        id : websiteId,
        userId
    },
        include :{
            ticks: true
        }
    });
    res.json(data);
});

app.get("/api/v1/websites",authMiddleware, async (req, res) => {
    const userId = req.userId!;
    const websites = await prismaClient.website.findMany({
        where :{
            userId,
            disabled : false
        },
        include :{
            ticks: true
        }
    })
    res.json({websites});
});

app.delete("/api/v1/website",authMiddleware, async (req, res) => {
    const websiteId = req.body.websiteId;
    const userId = req.userId!;
    await prismaClient.website.update({
        where :{
            id: websiteId,
            userId
        },
        data:  {
            disabled : true
        }
    });
    res.json({
        message : "website deleted successfully!!"
    })
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    });