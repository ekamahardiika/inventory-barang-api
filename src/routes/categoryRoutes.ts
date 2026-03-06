import { Router } from "express";
import { 
    getAllCategoriesController,
    getAllCategoryByIdController,
    getProductByCategoryController,
    createCategoryController,
    deleteCategoryController,
    updateCategoryController
 } from "../controllers/categoryControllers";
import authMiddleware from "../middlewares/authMiddlewares";
import { roleMiddlewares } from "../middlewares/roleMiddlewares";

const router = Router();

//Middleware
router.use(authMiddleware)

//Routes
router.get('/', roleMiddlewares("ADMIN"), getAllCategoriesController);
router.get('/:id', roleMiddlewares("ADMIN"), getAllCategoryByIdController);
router.post('/', roleMiddlewares("ADMIN"), createCategoryController);
router.delete('/:id', roleMiddlewares("ADMIN"), deleteCategoryController);
router.put('/:id', roleMiddlewares("ADMIN"), updateCategoryController);
router.put('/:id/products', roleMiddlewares("ADMIN"), getProductByCategoryController);

export default router;