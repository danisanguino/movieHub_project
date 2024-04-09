import {Request, Response} from "express";
import prisma from "../db/client";

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

export const createMovie = async (req: Request, res: Response) => {
    const { title, image, score, genres } = req.body;
    const userId = parseInt(req.params.userId)

    if (!title || !image ) {
        return res.status(400).send("Titulo e imagen are required");
    }

    if (!userId) {
        return res.status(400).send("El campo userId is required");
    }

    try {
        //Crear transanción porque hay varias funciones
        //Crear pelicula
        //crear generos de la peli
        const newMovie = await prisma.$transaction(async (prisma) => {
            const movie = await prisma.movies.create({
                data: {title, image, score, userId}
            });

        if(genres && genres.length) {
            //Be Careful here
            const createGenre = genres.map((genreId: number) => ({
                movieId: movie.id,
                genreId: genreId
            }));

        await prisma.movieGenre.createMany({
            //Se la pasa la funcion crear genero
            data: createGenre
        });
        }

        return prisma.movies.findUnique({
            where: { id: movie.id },
            include: { genres: true }
        });

        });

        res.status(201).send(`${title} has been created`);

        
    } catch (error) {
        res.status(400).send("Movie no creada, esto no va...")
    }
}


export const updateMovie = async (req: Request, res: Response) => {
    const { title, image, score, genres } = req.body;
    const movieId = parseInt(req.params.movieId)

    try {
        const updatingMovie = await prisma.$transaction(async (prisma) => {
            const movie = await prisma.movies.update({
                where: {id: movieId},
                data: {title, image, score}
            });

        if(genres && genres.length) {
            //Be Careful here
            const createGenre = genres.map((genre: number) => ({
                movieId: movieId,
                genreId: genre
            }));

        await prisma.movieGenre.deleteMany({
            where: { movieId: movieId}
        });

        await prisma.movieGenre.createMany({
            //Se la pasa la funcion crear genero
            data: createGenre
        });
        }

        return prisma.movies.findUnique({
            where: { id: movieId },
            include: { genres: true }
        });

        });

        res.status(201).send(updatingMovie);
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
        res.status(404).send("Fatal error to delete this movie")
        
    }
}