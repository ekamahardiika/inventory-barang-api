import { Router } from "express";
import { 
    getAllProductsController,
    getProductByIdController,
    createProductController,
    deleteProductController,
    updateProductController
 } from "../controllers/productControllers";
import authMiddleware from "../middlewares/authMiddlewares";

const router = Router();

//Middleware
router.use(authMiddleware)

//Routes
router.get('/', getAllProductsController);
router.get('/:id', getProductByIdController);
router.post('/', createProductController);
router.delete('/:id', deleteProductController);
router.put('/:id', updateProductController);

export default router;