import { Schema, model } from "mongoose";

interface IUserSchema {
    name: String,
    email: String,
    password: String,
    movies: string[],
    createAt?: Date,
    updateAt?: Date
}


const userSchema = new Schema ({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    //Relaciones peliculas con el usuario
    movies: [{
        // type: String
        type: Schema.Types.ObjectId, ref:"peliculasData"
    }]
}, {timestamps: true});

//Nombre de Modelo con PascalCase por convención
const UserModel = model<IUserSchema>("User", userSchema);

export default UserModel;