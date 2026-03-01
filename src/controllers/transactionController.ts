import { Request, Response } from "express";
import { errorHandler } from "../utils/errorHandlers";
import { createTransaction } from "../services/transactionService";

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

export { createTransactionController }