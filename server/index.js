import express from 'express';
import * as dotenv from "dotenv";
import cors from "cors";
import mongoose from 'mongoose';

import UserRouter from "./routes/User.js";

dotenv.config();
const app= express();

app.use(cors({origin: true, credentials: true}));
app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({extended:true}));


app.use("/api/user", UserRouter);
app.get("/", async(req,res)=>{
    res.status(200).json({
        message:"hello gfg Developers"
    })
})

const ConnectDB=()=>{
    mongoose.set("strictQuery",true);
    mongoose.connect(process.env.MONGODB_URL)
    .then((res)=> console.log("Connected To MongoDB"))
    .catch((err)=>{
        console.log(err);
})
}




app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    return res.status(status).json({
      success: false,
      status,
      message,
    });
  });
  


ConnectDB();
const port=8080;
app.listen(port, ()=>console.log(`server is running on port ${port}`))