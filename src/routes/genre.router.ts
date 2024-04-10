import { Router } from "express";
import { createGenre, deleteGenre, getAllGenre, updateGenre } from "../controllers/genre.controller";


const genreRouter = Router();

genreRouter.get("/", getAllGenre);
genreRouter.post("/:movieId", createGenre);
genreRouter.patch("/:genreId", updateGenre);
genreRouter.delete("/:genreId", deleteGenre);

export default genreRouter;

