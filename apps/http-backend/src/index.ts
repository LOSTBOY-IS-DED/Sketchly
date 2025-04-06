import express from "express" ; 
import JWT from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";
import { authMiddleware } from "./middleware.js";
import{ CreateUserSchema , CreateRoomSchema , SignInSchema } from "@repo/common/types";

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
app.post("/signup" , (req , res) => {
    const data = CreateUserSchema.safeParse(req.body);
    if(!data.success){
        res.json({
            message : "incorrect inputs"
        })
        return ;
    }

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