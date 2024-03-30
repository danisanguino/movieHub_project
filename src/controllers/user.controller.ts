import {Request, Response} from "express";
import prisma from "../db/client";

//Acciones y funcionalidad

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const findUsers = await prisma.user.findMany();
        res.status(202).send(findUsers)
    } catch (error) {
        res.status(404).send("error to get users")
    }
}

export const createUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    try {
        const newUser = await prisma.user.create({
            data: { name: name, email: email, password: password }
        });
        res.status(200).send(`${newUser} has been created`)
        
    } catch (error) {
        res.status(400).send("Usuario no creado, esto no va...")
    }
}

export const updateUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const { userId } = req.params

    try {
        const updating = await prisma.user.update({
            where: { id: userId },  
            data: { name, email, password }
        })

        res.status(202).send(`User ${updating} has been updated`)
    } catch (error) {
        res.status(404).send("Error to update user")
    }
}

export const deleteUser = async(req: Request, res: Response) => {
    const { userId } = req.params
    try {
        const deleting = await prisma.user.delete({
            where: {id: userId}
        })
        res.status(200).send("User has been deleted")
    } catch (error) {
        res.status(404).send("Error to delete user")
    }
}