import express from "express";
import userRouter from "./routes/user.router";
import movieRouter from "./routes/movies.router";
import genreRouter from "./routes/genre.router";



const expressApp = express();

//middlewares
expressApp.use(express.json());
//routes middlewares
expressApp.use("/user", userRouter);
expressApp.use("/movie", movieRouter);
expressApp.use("/genre", genreRouter)


export default expressApp;