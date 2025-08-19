const express = require("express");
const mongoose = require("mongoose");
const app = express()
app.use(express.json())
const userRouter = require("./routers/user")
const bookRouter = require("./routers/book");

const dotenv = require("dotenv");
dotenv.config();
 const URL = process.env.DATABASE_URL;
const connectDB = async () => {
    try {
         mongoose.set("strictQuery", false);
         mongoose.connect(URL)
        console.log("connected to db")
    } catch (error) {
        console.log(error)
        process.exit() // Exit process with failure
    }
}
connectDB()
    
app.use("/", userRouter)
app.use("/", bookRouter)

app.listen(process.env.PORT || 8000, () => {
    console.log("server is running on port 8000")
})