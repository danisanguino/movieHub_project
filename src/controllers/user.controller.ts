import {Request, Response} from "express";
import prisma from "../db/client";

//Functions to endpoints
//Actions order => 1ºget 2ºpost 3ºpatch 4ºdelete

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const findUsers = await prisma.user.findMany({
            include: {movies: true}
        });
        res.status(201).send(findUsers)
    } catch (error) {
        res.status(404).send("Error to get users")
    }
}

export const createUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    try {
        const newUser = await prisma.user.create({
            data: { name: name, email: email, password: password }
        });
        res.status(201).send(`${name} has been created`)
        
    } catch (error) {
        res.status(400).send("Error to create user")
    }
}

export const updateUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const userId = parseInt(req.params.userId)

    try {
        const updating = await prisma.user.update({
            where: { id: userId },  
            data: { name, email, password }
        })

        res.status(201).send(`User ${name} has been updated`)
    } catch (error) {
        res.status(404).send("Error to update user")
    }
}

export const deleteUser = async(req: Request, res: Response) => {
    const userId = parseInt(req.params.userId)
    try {
        const deleting = await prisma.user.delete({
            where: {id: userId}
        })
        res.status(200).send("User has been deleted")
    } catch (error) {
        res.status(404).send("Error to delete user")
    }
}