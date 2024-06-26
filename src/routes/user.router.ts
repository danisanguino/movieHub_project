import { Router } from "express";
import { createUser, deleteUser, getAllUsers, updateUser } from "../controllers/user.controller";

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.post("/", createUser);
userRouter.patch("/:userId", updateUser)
userRouter.delete("/:userId", deleteUser)

export default userRouter;