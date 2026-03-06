import { Request, Response } from "express";
import { errorHandler } from "../utils/errorHandlers";
import { 
    getAllUser,
    getUserById,
    createUser,
    deleteUser,
    updateUser
 } from "../services/userServices";

async function getAllUserController(req: Request, res: Response){
    try {

        const users = await getAllUser()
        res.status(200).json({
            message: "Success",
            data: users
        })
        
    } catch (error) {
        errorHandler(error, res)
    }
}

async function getUserByIdController(req: Request, res: Response){
    try {
        const { id } = req.params;

        if (typeof id !== "string") {
            return res.status(400).json({
                message: "ID must String"
            })
        }

        const user = await getUserById(id)
        res.status(200).json({
            message: "Success",
            data: user
        })

    } catch (error) {
        errorHandler(error, res)
    }
}

async function createUserController(req: Request, res: Response){
    try {

        const { name, email, password, role } = req.body;
        const user = await createUser(name, email, password, role)
        res.status(201).json({
            message: "Create Success",
            data: user
        })
        
    } catch (error) {
        errorHandler(error, res)
    }
}

async function deleteUserController(req: Request, res: Response){
    try {
        
        const { id } = req.params;

        if (typeof id !== "string") {
            return res.status(400).json({
                message: "ID must String"
            })
        }

        const user = await deleteUser(id)
        res.status(201).json({
            message: "Delete Success",
            data: user
        })
        
    } catch (error) {
        errorHandler(error, res)
    }
}

async function updateUserController(req: Request, res: Response){
    try {

        const { id } = req.params;

        if (typeof id !== "string") {
            return res.status(400).json({
                message: "ID must String"
            })
        }

        const { name, password, role } = req.body;

        const user = await updateUser(id, name, password, role)
        res.status(201).json({
            message: "Update Success",
            data: user
        })
        
    } catch (error) {
        errorHandler(error, res)
    }
}

export {
    getAllUserController,
    getUserByIdController,
    createUserController,
    deleteUserController,
    updateUserController
}