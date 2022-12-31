require("dotenv/config")
const express = require("express");
const connectDB = require("./config/DB")

const PORT = process.env.PORT||5000;
const app = express();

connectDB();

app.use(express.json());

app.use("/",require("./routers/longenedUrlRouter"));
app.use("/url",require("./routers/shortenedUrlRouter"));

app.get("/",)

app.listen(PORT, ()=>{
    console.log(`Ready on http://localhost:${PORT}`);
});