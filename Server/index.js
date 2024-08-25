
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
    origin: 'https://spicemaven-online-food-ordering.vercel.app',
    credentials: true,
    withCredentials: true,
    
}));
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))
app.use(express.json({limit:"20kb"}))
app.use("/restro",router)

app.use(bodyParser.json()); 
app.listen(process.env.PORT,()=>{
    console.log(`Server running on port ${process.env.PORT}`);
    
})

