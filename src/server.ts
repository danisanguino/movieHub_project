import express from "express";
import userRouter from "./routes/user.router";
import movieRouter from "./routes/movies.router";
import genreRouter from "./routes/genre.router";
import cors from "cors";



const expressApp = express();

//middlewares
expressApp.use(express.json());
expressApp.use(cors());

//routes middlewares
expressApp.use("/user", userRouter);
expressApp.use("/movie", movieRouter);
expressApp.use("/genre", genreRouter)


export default expressApp;