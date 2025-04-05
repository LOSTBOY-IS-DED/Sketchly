import express from "express" ; 
import JWT from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";

const app = express();

app.use(express.json());

app.post("/signin" , (req , res) => {

})
app.post("/signup" , (req , res) => {
    const userId = 123 ; 
    const token = JWT.sign({ userId } , JWT_SECRET);
    res.json({ token });
    
})
app.post("/create-room" , (req , res) => {

})



app.listen(3000, () => {
    console.log("Server is running on port 3000");
});