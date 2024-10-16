import express from "express";
import { userController } from "./user.controller";
import verifyToken from "../../middleware/verifyToken.middleware";
import { checkUserRoleAndRateLimit } from "../../middleware/apiRateLimit.middleware";
import { isAdmin, isUser } from "../../middleware/auth.middleware";

const router = express.Router()

router.post('/', userController.createUser)
router.post('/login', userController.signInUser)
router.get('/', userController.getUsers)
// File Management Routes
router.post('/upload', userController.fileUpload)
router.delete('/deletefile', userController.deleteFileData)

// Payment Gateway Routes

// Redirect URL will be in app.ts file, Here redirect URL will not work


/**
 * MIDDLEWARE CONFIGURATION
 * --------------------------------
 * */

// router.get('/', verifyToken, isAdmin, checkUserRoleAndRateLimit, userController.getUsers)

export const userRoutes = router;