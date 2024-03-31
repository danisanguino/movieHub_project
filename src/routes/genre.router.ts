import { Router } from "express";
import { createGenre, deleteGenre, getAllGenre, updateGenre } from "../controllers/genre.controller";


const genreRouter = Router();

//funciones get y tal
genreRouter.get("/", getAllGenre);
genreRouter.post("/", createGenre);
genreRouter.patch("/", updateGenre);
genreRouter.delete("/", deleteGenre);

export default genreRouter;

