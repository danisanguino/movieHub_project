import express from "express";
import userRouter from "./routes/user.router";
import movieRouter from "./routes/movies";


const expressApp = express();

//middlewares
expressApp.use(express.json());
//routes middlewares
expressApp.use("/user", userRouter);
expressApp.use("/movie", movieRouter)


export default expressApp;