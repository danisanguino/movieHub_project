import { Request, Response } from "express";
import prisma from "../db/client";

export const getAllGenre = (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        res.status(404).send("Error to get genres")
    }
    res.send("te traigo los generos bro")
}

export const createGenre = (req: Request, res: Response) => {
    res.send("te he creado un género peliculero bro")
}

export const updateGenre = (req:Request, res: Response) => {
    res.send("te he actualizado el genero bro")
}

export const deleteGenre = (req:Request, res: Response) => {
    res.send("te he borrado la pelicula bro")
}