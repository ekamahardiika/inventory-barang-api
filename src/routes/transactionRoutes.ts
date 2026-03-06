import { Router } from "express";
import { getAllTransactionController, getTransactionByIdController, transactionByUserController, createTransactionController } from "../controllers/transactionController";
import authMiddleware from "../middlewares/authMiddlewares";
import { roleMiddlewares } from "../middlewares/roleMiddlewares";

const router = Router();

router.use(authMiddleware)

//Route
router.get('/', roleMiddlewares("ADMIN"), getAllTransactionController)
router.get('/', roleMiddlewares("ADMIN"), getTransactionByIdController)
router.post('/', roleMiddlewares("ADMIN"), createTransactionController)
router.get('/', roleMiddlewares("USER"), transactionByUserController)

export default router;