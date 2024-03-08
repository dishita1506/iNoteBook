const connectToMongo=require("./db")
const express=require("express");
const app=express();
const port=5000;

//Direct hum backend s apni API ko fetch nhi kr skte vo block ho jati hai 
//We need to install npm package cors 
const cors=require("cors");
app.use(cors());
app.use(express.json());

connectToMongo();

app.use(express.json());

//AVAILABLE ROUTES
app.use("/api/auth",require("./routes/auth"));
app.use("/api/notes",require("./routes/notes"));


app.get('/',(req,res)=>{
    res.send("hello welcome to our express server");
})

app.listen(port,()=>{
    console.log(`iNoteBook Server listening at http://localhost:${port}`);
})