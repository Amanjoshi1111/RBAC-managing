import mongoose, { Mongoose } from "mongoose";
import userModel from "../domains/users/model";
import roleModel from "../domains/roles/model";
import postModel from "../domains/posts/model";
import commentModel from "../domains/comments/model";
import permissionModel from "../domains/permissions/model";

mongoose.connection.on("disconnected", () => {
    console.log("Mongoose disconnected from database");
})

async function connectDb() {
    try {
        const dbConnectionString: string = `${process.env.DB_URL}/${process.env.DB_NAME}`;
        const mongoInstance: Mongoose = await mongoose.connect(dbConnectionString);

        console.log("Connected to database, hostName : ", mongoInstance.connection.host);
    } catch (err) {
        console.log("Database connection failed, Err : ", err);
        process.exit(1);
    }
}

export default connectDb;