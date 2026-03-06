import { Router } from "express";
import { 
    getDailyReportController,
    getMonthlyReportController,
    getYearlyReportController,
    getTopProductsController,
    getLowStockProductsController
 } from "../controllers/reportControllers";
import authMiddleware from "../middlewares/authMiddlewares";
import { roleMiddlewares } from "../middlewares/roleMiddlewares";

const router = Router();

//Middleware
router.use(authMiddleware)

//Routes
router.get('/daily', roleMiddlewares("ADMIN"), getDailyReportController);
router.get('/monthly', roleMiddlewares("ADMIN"), getMonthlyReportController);
router.get('/yearly', roleMiddlewares("ADMIN"), getYearlyReportController);
router.get('/top-products', roleMiddlewares("ADMIN"), getTopProductsController);
router.get('/low-stock', roleMiddlewares("ADMIN"), getLowStockProductsController);

export default router;

