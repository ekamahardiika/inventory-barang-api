import { Router } from "express";
import { 
    getAllCategoriesController,
    getAllCategoryByIdController,
    createCategoryController,
    deleteCategoryController,
    updateCategoryController
 } from "../controllers/categoryControllers";
import authMiddleware from "../middlewares/authMiddlewares";

const router = Router();

//Middleware
router.use(authMiddleware)

//Routes
router.get('/', getAllCategoriesController);
router.get('/:id', getAllCategoryByIdController);
router.post('/', createCategoryController);
router.delete('/:id', deleteCategoryController);
router.put('/:id', updateCategoryController);

export default router;