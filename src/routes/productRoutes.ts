import { Router } from "express";
import { 
    getAllProductsController,
    getProductByIdController,
    createProductController,
    deleteProductController,
    updateProductController,
    updateProductStockController
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
router.patch('/:id/stok', roleMiddlewares("ADMIN"), updateProductStockController);

export default router;