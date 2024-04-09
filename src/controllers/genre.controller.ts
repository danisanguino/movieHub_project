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
    
    const { calabaza } = req.body

    if (!calabaza) {
        return res.status(400).send("titulo no existe title antes de tirar de recurso")
    }

    try {
        const newGenre = await prisma.genres.create({
            data:{ title: calabaza } //title schema //Calabaza lo que manda el formulario
        });
        res.status(201).send(`Genre ${calabaza} has been created`)
    } catch (error) {
        res.status(404).send("Error to add genre")
    }
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