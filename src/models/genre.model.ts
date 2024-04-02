import { Schema, model } from "mongoose";

interface IGenreSchema {
    title: String
}

const movieSchema = new Schema <IGenreSchema> ({
    title: String
})

const GenreModel = model<IGenreSchema>("genre", movieSchema);

export default GenreModel