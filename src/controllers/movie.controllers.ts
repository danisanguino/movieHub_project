import {Request, Response} from "express";
import prisma from "../db/client";
import { uploadImage } from "../utils/cloudinaryConfig";
import fs from "fs-extra";

//Functions to endpoints
//Actions order => 1ºget 2ºpost 3ºpatch 4ºdelete

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

export const getOneMovie = async (req: Request, res: Response) => {
    
    const movieId = parseInt(req.params.movieId);
    
    try {
        const findMovie = await prisma.movies.findUnique({
            where:{id: movieId}, 
            include: {genres: true}
        });


        res.status(201).send(findMovie)
    } catch (error) {
        res.status(404).send("Error to get the movie")
    }
}


export const createMovie = async (req: Request, res: Response) => {
    const { title, score, genres, sinopsis } = req.body;
    const image = req.files?.image;
    //CONSOLE LOG ABAJO
    console.log(image);
    console.log(req.files);
    const userId = parseInt(req.params.userId)

    if (!title || !image ) {
        return res.status(400).send("Title and image are required");
    }

    if (!userId) {
        return res.status(400).send("UserId is required");
    }

    try {
        //Create transantion for many to many porque hay varias funciones
        //Create movie
        //Create id of genre 
        if (Array.isArray(image)){
            return res.status(404).send({msg: "Only 1 image please"});
        } else {
            const resultImage = await uploadImage(image.tempFilePath);
            const newMovie = await prisma.$transaction(async (prisma) => {
                const movie = await prisma.movies.create({
                    data: {
                        title,
                        image: resultImage.secure_url,
                        image_publicId: resultImage.public_id,
                        score: parseInt(score),
                        sinopsis,
                        userId
                    }
                });
                await fs.unlink(image.tempFilePath);
    
            if(genres && genres.length) {
                //Be Careful here
                const createGenre = genres.map((genre: string) => ({
                    movieId: movie.id,
                    genreId: parseInt(genre)
                }));
    
            await prisma.movieGenre.createMany({
                //Crete genre to be data from line 40
                data: createGenre
            });
            }
    
            return prisma.movies.findUnique({
                where: { id: movie.id },
                include: { genres: true }
            });
    
            });
    
            res.status(201).send(`${title} has been created`);
        }
        

        
    } catch (error) {
        res.status(400).send("Error to create movie")
        console.log(error);
    }
}


export const updateMovie = async (req: Request, res: Response) => {
    const { title, score, genres, sinopsis } = req.body;
    const image = req.files?.image;
    const movieId = parseInt(req.params.movieId)

    try {
        if (image) {
            if (Array.isArray(image)) {
               return res.status(404).send("Error del try del segundo if del update")
            } else {
                const resultImage = await uploadImage(image.tempFilePath);
                console.log(resultImage)
                const movie = await prisma.movies.update({
                    where: { id: movieId },
                    data: { image_publicId: resultImage.imageid, image: resultImage.secure_url }
                });
            } 
        }
        const updatingMovie = await prisma.$transaction(async (prisma) => {
            const movie = await prisma.movies.update({
                where: {id: movieId},
                data: {title, score: parseInt(score), sinopsis}
            });

        if(genres && genres.length) {
            const createGenre = genres.map((genre: string) => ({
                movieId: movieId,
                genreId: parseInt(genre)
            }));

        await prisma.movieGenre.deleteMany({
            where: { movieId: movieId}
        });

        await prisma.movieGenre.createMany({
            data: createGenre
        });
        }

        return prisma.movies.findUnique({
            where: { id: movieId },
            include: { genres: true }
        });

        });

        res.status(201).send(`${updatingMovie?.title} updated correctly`);
    } catch (error) {
        res.status(404).send("Error to update movie")
    }
}

export const deleteMovie = async (req: Request, res: Response) => {
    const movieId = parseInt(req.params.movieId)
    try { 
        const movieDelete = await prisma.movies.delete({
            where: { id: movieId },
            include: { genres: true }
        })
        res.status(201).send("Movie deleted correctly")
        
    } catch (error) {
        res.status(404).send("Error to delete this movie")
        
    }
}