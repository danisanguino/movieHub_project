import { Request, Response } from "express";
import prisma from "../db/client";

export const getAllGenre = async (req: Request, res: Response) => {
    try {
        const gettingGenres = await prisma.genres.findMany();
        res.status(201).send(gettingGenres);
    } catch (error) {
        res.status(404).send("Error to get genres")
    }
}

export const createGenre = async(req: Request, res: Response) => {
    //     const { title } = req.body
    //     const movieId = parseInt(req.params.movieId);
    // try {
    //     const newGenre = await prisma.genres.create({
    //         data:{title, movies: { connect: {id:movieId}}}
    //     });
    //     res.status(201).send(`Genre ${title} has been added to movie`)
    // } catch (error) {
    //     res.status(404).send("Error to add genre")
    // }
}

export const updateGenre = async (req:Request, res: Response) => {
        const {title} = req.body;
        const genreId = parseInt(req.params.genreId);
    try {
        const updatting = await prisma.genres.update({
            where: {id: genreId},
            data: {title}
        })
        res.status(201).send(`${title} updated correctly`)
    } catch (error) {
        res.status(404).send("Error to update genre")
    }
}

export const deleteGenre = async (req:Request, res: Response) => {
        const genreId = parseInt(req.params.genreId);
        
    try {
        const genreDelete = await prisma.genres.delete({
            where: {id: genreId}
        });
        res.status(201).send("Genre deleted correcly")
    } catch (error) {
        res.status(404).send("Error to delete genre")
    }
}