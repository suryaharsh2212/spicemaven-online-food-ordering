
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import { router } from "./src/Routes/routes.app.js";
import "dotenv/config";
import ConnectToMongo from "./src/Database/DataBaseConnection/ConnectToMongo.js";

import bodyParser from "body-parser";
const app =express();
ConnectToMongo()


app.use(cors({ 
    origin: ['http://localhost:5173','*'],
    credentials: true,
    withCredentials: true,
    
}));
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))
app.use(express.json({limit:"20kb"}))
app.use("/restro",router)

app.use(bodyParser.json()); 
app.listen(process.env.PORT,'0.0.0.0',()=>{
    console.log(`Server running on port ${process.env.PORT}`);
    
})

