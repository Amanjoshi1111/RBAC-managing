import dotenv from "dotenv";
dotenv.config();
import roleModel from "../domains/roles/model";
import userModel from "../domains/users/model";
import connectDb from "./db";
import postModel from "../domains/posts/model";
import commentModel from "../domains/comments/model";
import permissionModel from "../domains/permissions/model";


async function seedDatabase(){
    try{

        //Connect Db
        await connectDb();

        //Create all collections explicitly
        await createDefaultCollections();
        console.log("Default collections created");

        //Add initial permissions
        const actions = ["get", "create", "update", "delete"];
        const features = ["role", "permission", "user", "comment", "post"];

        const permissions = features.map((feature)=> {
            return {
                feature,
                actions
            }
        });

        //Add default permissions
        const permissionData = await permissionModel.create(permissions);


        //Add default admin role
        const adminRole = new roleModel({
            name : 'admin',
            permissions: permissions
        })
        const adminRoleId = (await adminRole.save())._id;

        //Add default admin user
        const adminUser = new userModel({
            username : "admin",
            password: "admin",
            roleId : adminRoleId
        })
        await adminUser.save();

    }catch(err){
        console.log(`'seedData', Err : `, err);
    }
}
  
async function createDefaultCollections() {
    await Promise.all(
        [
            userModel.createCollection(),
            roleModel.createCollection(),
            postModel.createCollection(),
            commentModel.createCollection(), 
            permissionModel.createCollection()
        ]
    );
}

seedDatabase()
.then(()=>{
    console.log("Database seeded");
})
.catch((err)=>{
    console.log("Error : ", err);
})