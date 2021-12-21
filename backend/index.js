const connectToMongo=require("./db");
const express=require ("express")
connectToMongo();
const app=express();
const port=4000;
var cors=require("cors");

//used for dealing in json files (middleware)
app.use(express.json());

app.use(cors());

app.get("/",(req,res)=>{
    res.send("hello")
})
// // Available Routes
app.use("/api/auth",require("./routes/auth"));
// app.use("/api/auth",require("./routes/auth"));

app.use("/api/notes",require("./routes/notes"));


app.listen(port,()=>{
    console.log(`example app listening at http://localhost:${port}`)
})