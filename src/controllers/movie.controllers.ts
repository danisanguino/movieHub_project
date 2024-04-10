import {Request, Response} from "express";
import MovieModel from "../models/movie.model";


export const getAllMovies = async (req: Request, res: Response) => {
    try {
        const findMovie = await MovieModel.find().populate("genres");
        res.status(201).send(findMovie)
    } catch (error) {
        res.status(404).send("Error to get movies")
    }
}

export const createMovie = async (req: Request, res: Response) => {
    const { title, image, score} = req.body;
    const { userId } = req.params;

    try {
        const movieCreate = await MovieModel.create(
            { title:title, image: image, score:score});
        await MovieModel.findByIdAndUpdate(
            { _id: userId },
            {$push: {movies: movieCreate._id}})
        res.status(200).send(`The movie ${title} has been created`)
    } catch (error) {
        res.status(401).send("Something is wrong to create movie")
        
    }
}

export const updateMovie = async (req:Request, res:Response) => {
    const { title, poster_image, score } = req.body;
    const { movieId } = req.params

    try {
        const movieUpdate = await MovieModel.findByIdAndUpdate(
            {_id: movieId},
            {title, poster_image, score},
            {new: true});
        res.status(201).send(`Movie ${title} has been updated correctly`)
    } catch (error) {
        
    }
}

export const deleteMovie = async (req: Request, res: Response) => {
    const { movieId } = req.params
    try { 
        const movieDelete = await MovieModel.findByIdAndDelete({ _id: movieId})
        res.status(201).send("Movie deleted correctly")
        
    } catch (error) {
        res.status(404).send("Fatal error to delete this movie")
        
    }
}