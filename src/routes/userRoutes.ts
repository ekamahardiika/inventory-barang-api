import { Router } from "express";
import { 
    getAllUserController,
    getUserByIdController,
    createUserController,
    deleteUserController,
    updateUserController
 } from "../controllers/userControllers";
import authMiddleware from "../middlewares/authMiddlewares";
import { roleMiddlewares } from "../middlewares/roleMiddlewares";

const router = Router();

//Middleware
router.use(authMiddleware)

//Routes
router.get('/', roleMiddlewares("ADMIN"), getAllUserController);
router.get('/:id', roleMiddlewares("ADMIN"), getUserByIdController);
router.post('/', roleMiddlewares("ADMIN"), createUserController);
router.delete('/:id', roleMiddlewares("ADMIN"), deleteUserController);
router.put('/:id', roleMiddlewares("ADMIN"), updateUserController);

export default router;