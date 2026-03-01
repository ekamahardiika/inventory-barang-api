import { Router } from "express";
import { createTransactionController } from "../controllers/transactionController";
import authMiddleware from "../middlewares/authMiddlewares";

const router = Router();

router.use(authMiddleware)

//Route
router.post('/', createTransactionController)

export default router;