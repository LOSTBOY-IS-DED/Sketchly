import express from "express" ; 
import JWT from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";
import { authMiddleware } from "./middleware.js";
import{ CreateUserSchema , CreateRoomSchema , SignInSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";

const app = express();

app.use(express.json());

app.post("/signin" , (req , res) => {
    const data = SignInSchema.safeParse(req.body);
    if(!data.success){
        res.json({
            message : "incorrect inputs"
        })
        return ;
    }

    res.json({
        message : "signed in"
    })
})
app.post("/signup" , async (req , res) => {
    const data = CreateUserSchema.safeParse(req.body);
    if(!data.success){
        res.json({
            message : "incorrect inputs"
        })
        return ;
    }
    const existingUser = await prismaClient.user.findUnique({
        where  : {
            username : data.data.username
        }
    })
    if(existingUser){
        res.json({
            message : "username already exists"
        })
        return ;
    }
    const user = await prismaClient.user.create({
        data : {
            username : data.data.username ,
            password : data.data.password ,
            name : data.data.name ,
        }
    })
    const userId = 123 ; 
    const token = JWT.sign({ userId } , JWT_SECRET);
    res.json({ token });
    
})
app.post("/create-room" , authMiddleware , (req , res) => {
    const data = CreateRoomSchema.safeParse(req.body);
    if(!data.success){
        res.json({
            message : "incorrect inputs"
        })
        return ;
    }
    res.json({
        message : "created room"
    })
})



app.listen(3000, () => {
    console.log("Server is running on port 3000");
});