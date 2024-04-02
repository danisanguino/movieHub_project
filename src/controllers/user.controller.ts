import {Request, Response} from "express";
import UserModel from "../models/user.model";

//Acciones y funcionalidad

export const getAllUser = async (req:Request, res:Response) => {
    try {
        const allUsers = await UserModel.find().populate("movies");
        res.status(200).send(allUsers);
    } catch (error) {
        res.status(400).send(error);
    }
}

export const createUser = async (req:Request, res:Response) => {
    const { name, email, password } = req.body
    
    try {
        const newUser = await UserModel.create({ name:name, email:email, password:password });
        //Siempre devolver algo, en este caso un estado
        res.status(201).send(newUser + "ha sido creado correctamente")
        
    } catch (error) {
        res.status(401).send(error)
    }
}

export const updateUser = async (req:Request, res:Response) => {
    const { name, email, password } = req.body;
    const {userId} = req.params;

    try {
        //Cambiar usuario necesita 3 objetos, encontrar, que quieres cambiar, permitir traer objeto nuevo ya cambiado
        const userUpdate = await UserModel.findByIdAndUpdate(
            {_id: userId},
            {name:name, email:email, password:password},
            {new: true});
        res.status(201).send(userUpdate + "se ha modificado correctamente bro")
    } catch (error) {
        
    }
}


export const deleteUser = async (req:Request, res:Response) => {
    const {userId} = req.params;

    try {
        const userDelete = await UserModel.findByIdAndDelete({_id: userId});
        res.status(200).send(userDelete + "borrado correctamente");

    } catch (error) {
        
    }

    res.send(`User with id "${userId} has been deleted`)
}