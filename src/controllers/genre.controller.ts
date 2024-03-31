import { Request, Response } from "express";
import prisma from "../db/client";

export const getAllGenre = async (req: Request, res: Response) => {
    try {
        const gettingGenres = await prisma.genre.findMany();
        res.status(201).send(gettingGenres);
    } catch (error) {
        res.status(404).send("Error to get genres")
    }
}

export const createGenre = async(req: Request, res: Response) => {
        const {title} = req.body
        const { movieId} = req.params
    try {
        const newGenre = await prisma.genre.create({
            data:{title, movies: { connect: {id:movieId}}}
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