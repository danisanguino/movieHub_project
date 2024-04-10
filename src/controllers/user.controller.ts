import {Request, Response} from "express";
import UserModel from "../models/user.model";


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

        res.status(201).send(`${newUser} has been create correctly`)
        
    } catch (error) {
        res.status(401).send("User cannot be created" + error)
    }
}

export const updateUser = async (req:Request, res:Response) => {
    const { name, email, password } = req.body;
    const {userId} = req.params;

    try {
        const userUpdate = await UserModel.findByIdAndUpdate(
            {_id: userId},
            {name:name, email:email, password:password},
            {new: true});
        res.status(201).send(`${userUpdate?.name} has been updated`)
    } catch (error) {
        res.status(401).send("Error to update user")
    }
}


export const deleteUser = async (req:Request, res:Response) => {
    const {userId} = req.params;

    try {
        const userDelete = await UserModel.findByIdAndDelete({_id: userId});
        res.status(200).send(userDelete + "borrado correctamente");

    } catch (error) {
        res.status(401).send("Error to delete user")
        
    }

}