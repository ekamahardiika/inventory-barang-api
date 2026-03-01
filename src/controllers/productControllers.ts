import { Request, Response } from "express";
import { errorHandler } from "../utils/errorHandlers";
import { 
    getAllProducts,
    getProductById,
    createProduct,
    deleteProduct,
    updateProduct
 } from "../services/productServices";

async function getAllProductsController(req: Request, res: Response){
    try {

        const products = await getAllProducts()
        res.status(200).json({
            message: "Success",
            data: products
        })
        
    } catch (error) {
        errorHandler(error, res)
    }
}

async function getProductByIdController(req: Request, res: Response){
    try {
        const { id } = req.params;

        if (typeof id !== "string") {
            return res.status(400).json({
                message: "ID must String"
            })
        }

        const product = await getProductById(id)
        res.status(200).json({
            message: "Success",
            data: product
        })

    } catch (error) {
        errorHandler(error, res)
    }
}

async function createProductController(req: Request, res: Response){
    try {

        // const { data } = req.body;
        const product = await createProduct(req.body)
        res.status(200).json({
            message: "Create Success",
            data: product
        })
        
    } catch (error) {
        errorHandler(error, res)
    }
}

async function deleteProductController(req: Request, res: Response){
    try {
        
        const { id } = req.params;

        if (typeof id !== "string") {
            return res.status(400).json({
                message: "ID must String"
            })
        }

        const product = await deleteProduct(id)
        res.status(200).json({
            message: "Delete Success",
            data: product
        })
        
    } catch (error) {
        errorHandler(error, res)
    }
}

async function updateProductController(req: Request, res: Response){
    try {

        const { id } = req.params;

        if (typeof id !== "string") {
            return res.status(400).json({
                message: "ID must String"
            })
        }

        // const { data } = req.body;

        const product = await updateProduct(id, req.body)
        res.status(201).json({
            message: "Update Success",
            data: product
        })
        
    } catch (error) {
        errorHandler(error, res)
    }
}

export {
    getAllProductsController,
    getProductByIdController,
    createProductController,
    deleteProductController,
    updateProductController
}