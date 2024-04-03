import { Request, Response } from "express";
import GenreModel from "../models/genre.model";

export const getAllGenre = async (req: Request, res: Response) => {
    try {
        const gettingGenres = await GenreModel.find();
        res.status(201).send(gettingGenres);
    } catch (error) {
        res.status(404).send("Error to get genres")
    }
}

export const createGenre = async(req: Request, res: Response) => {
        const { title } = req.body
        const { movieId } = req.params
    try {
        const genreCreate = await GenreModel.create(
            { title:title});
        await GenreModel.findByIdAndUpdate(
            { _id: movieId },
            {$push: {genre: genreCreate._id}})
        res.status(201).send(`Genre ${title} has been added to movie`)
    } catch (error) {
        res.status(404).send("Error to add genre")
    }
}

export const updateGenre = async (req:Request, res:Response) => {
    const { title} = req.body;
    const { genreId } = req.params

    try {
        //Update movie necesita 3 objetos, encontrar, que quieres cambiar, permitir traer objeto nuevo ya cambiado
        const genreUpdate = await GenreModel.findByIdAndUpdate(
            {_id: genreId},
            {title},
            {new: true});
        res.status(201).send(`Genre ${title} has been updated correctly`)
    } catch (error) {
        
    }
}

export const deleteGenre = async (req: Request, res: Response) => {
    const { genreId } = req.params
    try { 
        const genreDelete = await GenreModel.findByIdAndDelete({ _id: genreId})
        res.status(201).send("Genre deleted correctly")
        
    } catch (error) {
        res.status(404).send("Fatal error to delete this genre")
        
    }
}