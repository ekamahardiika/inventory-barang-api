import { Request, Response } from "express";
import { errorHandler } from "../utils/errorHandlers";
import { getAllTransaction, getTransactionById, transactionByUser, createTransaction } from "../services/transactionService";

async function getAllTransactionController(req: Request, res: Response){
    try {

        const transaction = await getAllTransaction();

        res.status(200).json({
            message: "Create Success",
            data: transaction
        })
    } catch (error) {
        errorHandler(error, res)
    }
}

async function getTransactionByIdController(req: Request, res: Response){
    try {

        const { id } = req.params;

        if (typeof id !== "string") {
            return res.status(400).json({
                message: "ID must String"
            })
        }

        const transaction = await getTransactionById(id);

        res.status(200).json({
            message: "Create Success",
            data: transaction
        })
    } catch (error) {
        errorHandler(error, res)
    }
}

async function transactionByUserController(req: Request, res: Response){
    try {

        const transaction = await transactionByUser();

        res.status(200).json({
            message: "Create Success",
            data: transaction
        })
    } catch (error) {
        errorHandler(error, res)
    }
}

async function createTransactionController(req: Request, res: Response){
    try {

        const {userId, bayar, items} = req.body

        const transaction = await createTransaction(userId, bayar, items)

        res.status(200).json({
            message: "Create Success",
            data: transaction
        })
    } catch (error) {
        errorHandler(error, res)
    }
}

export { getAllTransactionController, getTransactionByIdController, transactionByUserController, createTransactionController }