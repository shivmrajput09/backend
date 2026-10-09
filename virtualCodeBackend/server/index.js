import express from "express";
 import cors from "cors"; // 1. cors ko import karein

let app = express();

// 2. CORS middleware ko enable karein (Dhyan rakhein ki isko app.get se pehle likhna hai)
 app.use(cors({
    origin : "http://localhost:5173"

 }
 )); //cors()  third party middleware
  
 
 app.use(express.json()) //middleware(built-in)

const port = 4001;

app.get("/", (req, res) => {
res.json({ name: "shivam", age: 22 });
});

app.post("/", (req, res) => {
console.log(req.body)
    res.send({ success:true});
});


app.listen(port, () => {
    console.log("server is started..");
});