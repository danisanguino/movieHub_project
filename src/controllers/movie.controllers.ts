import {Request, Response} from "express";
import prisma from "../db/client";


export const getAllMovies = async (req: Request, res: Response) => {
    try {
        const findMovie = await prisma.movies.findMany({
            include: {genres: true}
        });
        res.status(201).send(findMovie)
    } catch (error) {
        res.status(404).send("Error to get movies")
    }
}

export const createMovie = async (req: Request, res: Response) => {
    const { title, image, score } = req.body;
    const { userId } = req.params;

    try {
        const newMovie = await prisma.movies.create({
            data:{ title, image, score, user: { connect: {id:userId}} }
        });
        res.status(201).send(`${title} has been created`)
        
    } catch (error) {
        res.status(400).send("Movie no creada, esto no va...")
    }
}


export const updateMovie = async (req: Request, res: Response) => {
    const { title, image, score } = req.body;
    const { movieId } = req.params

    try {
        const updating = await prisma.movies.update({
            where: { id: movieId },  
            data: { title, image, score }
        })
        res.status(201).send(`Movie ${title} has been updated`)
    } catch (error) {
        res.status(404).send("Error to update movie")
    }
}

export const deleteMovie = async (req: Request, res: Response) => {
    const { movieId } = req.params
    try { 
        const movieDelete = await prisma.movies.delete({
            where: { id: movieId } 
        })
        res.status(201).send("Movie deleted correctly")
        
    } catch (error) {
        res.status(404).send("Fatal error to delete this movie")
        
    }
}