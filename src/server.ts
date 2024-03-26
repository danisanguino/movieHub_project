import express from "express";
import userRouter from "./routes/user.router";


const expressApp = express();

//middlewares
expressApp.use(express.json());
//routes middlewares
expressApp.use("/user", userRouter);


export default expressApp;