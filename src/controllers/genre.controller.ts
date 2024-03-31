import { Request, Response } from "express";
import prisma from "../db/client";

export const getAllGenre = async (req: Request, res: Response) => {
    try {
        const gettingGenres = await prisma.genre.findMany({
            include: {genres: true}
        });
        res.status(201).send(gettingGenres);
    } catch (error) {
        res.status(404).send("Error to get genres")
    }
}

export const createGenre = async(req: Request, res: Response) => {
        const {name} = req.body
        const { movieId} = req.params
    try {
        const newGenre = await prisma.genre.create({
            data:{name, movies: { connect: {id:movieId}}}
        });
    } catch (error) {
        
    }
}

export const updateGenre = (req:Request, res: Response) => {
    res.send("te he actualizado el genero bro")
}

export const deleteGenre = (req:Request, res: Response) => {
    res.send("te he borrado la pelicula bro")
}