import { Router } from "express";
import { createThreeInputsMovie } from "../controllers/movie.controllers";


const movieInputRouter = Router();

//Endpoints

movieInputRouter.post("/:userId", createThreeInputsMovie)

export default movieInputRouter;