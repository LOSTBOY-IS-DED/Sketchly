import express from "express" ; 

const app = express();

app.use(express.json());

app.post("/login" , (req , res) => {

})
app.post("/signup" , (req , res) => {

})
app.post("/create-room" , (req , res) => {

})



app.listen(3000, () => {
    console.log("Server is running on port 3000");
});