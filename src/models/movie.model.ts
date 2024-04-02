import { Schema, model } from "mongoose";

interface IMovieSchema {
    title: String,
    poster_image: String,
    score: String,
    genre: String,
    createAt?: Date,
    updateAt?: Date
}


const movieSchema = new Schema<IMovieSchema> ({
    title: {
        type: String,
        require: true, 
        unique: true
    },
    poster_image: {
        type: String,
        require: true,
    },
    score: {
        type: String,
        require: true
    },
    genre: {
        type: String,
        require: true
    }
}, {timestamps: true});

//Modelo con PascalCase
const MovieModel = model<IMovieSchema>("peliculasData", movieSchema);

export default MovieModel;

