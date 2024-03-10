import express from "express";
import { userController } from "./user.controller";
import verifyToken from "../../middleware/verifyToken.middleware";

const router = express.Router()

router.post('/', userController.createUser)
router.post('/login', userController.signInUser)
router.get('/', userController.getUsers)

/**
 * MIDDLEWARE CONFIGURATION
 * --------------------------------
 * */

// router.get('/', verifyToken, userController.getUsers)

export const userRoutes = router;