const express = require("express");
const app = express();
const userRouter = require("./routes/userRoutes");
const noteRoute = require("./routes/notesRoutes");
const mongoose = require("mongoose");
const  cors = require("cors");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 5000 ; 

app.use(express.json());
app.use(cors());

app.use("/users",userRouter);
app.use("/notes",noteRoute);

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    app.listen(PORT,()=>{
        console.log("connection sucessful");
    });
}).catch((error)=>{
    console.log(error);    
});


