import connectDb from "./db/db";
import app from "./server";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;

function main(){

    console.log("**************************SERVICE STARTED**************************")
    //Connect to database
    connectDb()
    .then(()=>{
        app.listen(process.env.PORT!, ()=>{
            console.log("Server Listening To Port : ", PORT);
        })
    })
}

main();