import express from "express";
import userRouter from "./routes/user.router";
import movieRouter from "./routes/movies.router";
import genreRouter from "./routes/genre.router";
import cors from "cors";
import fileUpload from "express-fileupload"
import { urlencoded } from "body-parser";
import movieInputRouter from "./routes/moviesInputs.router";



const expressApp = express();

//middlewares
expressApp.use(express.json());
expressApp.use(urlencoded({extended: true}))
expressApp.use(cors());
expressApp.use(fileUpload({useTempFiles: true, tempFileDir: "./uploads"}))

//routes middlewares
expressApp.use("/user", userRouter);
expressApp.use("/movie", movieRouter);
expressApp.use("/inputsmovie", movieInputRouter)
expressApp.use("/genre", genreRouter)


export default expressApp;