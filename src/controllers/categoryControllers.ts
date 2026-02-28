import { Request, Response } from "express";
import { errorHandler } from "../utils/errorHandlers";
import { 
    getAllCategories,
    getCategoryById,
    createCategory,
    deleteCategory,
    updateCategory
 } from "../services/categoryServices";

async function getAllCategoriesController(req: Request, res: Response){
    try {

        const categories = await getAllCategories()
        res.status(200).json({
            message: "Success",
            data: categories
        })
        
    } catch (error) {
        errorHandler(error, res)
    }
}

async function getAllCategoryByIdController(req: Request, res: Response){
    try {
        const { id } = req.params;

        if (typeof id !== "string") {
            return res.status(400).json({
                message: "ID must String"
            })
        }

        const category = await getCategoryById(id)
        res.status(200).json({
            message: "Success",
            data: category
        })

    } catch (error) {
        errorHandler(error, res)
    }
}

async function createCategoryController(req: Request, res: Response){
    try {

        const { name } = req.body;
        const category = await createCategory(name)
        res.status(201).json({
            message: "Create Success",
            data: category
        })
        
    } catch (error) {
        errorHandler(error, res)
    }
}

async function deleteCategoryController(req: Request, res: Response){
    try {
        
        const { id } = req.params;

        if (typeof id !== "string") {
            return res.status(400).json({
                message: "ID must String"
            })
        }

        const category = await deleteCategory(id)
        res.status(201).json({
            message: "Delete Success",
            data: category
        })
        
    } catch (error) {
        errorHandler(error, res)
    }
}

async function updateCategoryController(req: Request, res: Response){
    try {

        const { id } = req.params;

        if (typeof id !== "string") {
            return res.status(400).json({
                message: "ID must String"
            })
        }

        const { name } = req.body;

        const category = await updateCategory(id, name)
        res.status(201).json({
            message: "Update Success",
            data: category
        })
        
    } catch (error) {
        errorHandler(error, res)
    }
}

export {
    getAllCategoriesController,
    getAllCategoryByIdController,
    createCategoryController,
    deleteCategoryController,
    updateCategoryController
}