import { Router } from "express";
import { createMovie, deleteMovie, getAllMovies, getOneMovie, updateMovie, createThreeInputsMovie } from "../controllers/movie.controllers";


const movieRouter = Router();

//Endpoints
movieRouter.get("/", getAllMovies);
movieRouter.get("/:movieId", getOneMovie);
// movieRouter.post("/inputs/:userId", createThreeInputsMovie)
movieRouter.post("/:userId", createMovie );
movieRouter.patch("/:movieId", updateMovie)
movieRouter.delete("/:movieId", deleteMovie);

export default movieRouter;