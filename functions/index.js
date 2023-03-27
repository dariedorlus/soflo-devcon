import functions from "firebase-functions";
import express from "express";
import cors from "cors"
import {getAllTalks} from "./src/talks.js"

const app = express();
app.use (cors());

app.get("/test", (req,res)=>{
    res.send("The leads api es connected");
});

//API points for talks
app.get("/talks", getAllTalks)





export const api= functions.https.onRequest(app)