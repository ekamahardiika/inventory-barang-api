import { Router } from "express";
import { 
    getAllProductsController,
    getProductByIdController,
    createProductController,
    deleteProductController,
    updateProductController
 } from "../controllers/productControllers";
import authMiddleware from "../middlewares/authMiddlewares";
import { roleMiddlewares } from "../middlewares/roleMiddlewares";

const router = Router();

//Middleware
router.use(authMiddleware)

//Routes
router.get('/', roleMiddlewares("ADMIN"), getAllProductsController);
router.get('/:id', roleMiddlewares("ADMIN"), getProductByIdController);
router.post('/', roleMiddlewares("ADMIN"), createProductController);
router.delete('/:id', roleMiddlewares("ADMIN"), deleteProductController);
router.put('/:id', roleMiddlewares("ADMIN"), updateProductController);

export default router;