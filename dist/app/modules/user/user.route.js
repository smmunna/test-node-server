"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const verifyToken_middleware_1 = __importDefault(require("../../middleware/verifyToken.middleware"));
const apiRateLimit_middleware_1 = require("../../middleware/apiRateLimit.middleware");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const router = express_1.default.Router();
router.post('/', user_controller_1.userController.createUser);
router.post('/login', user_controller_1.userController.signInUser);
// router.get('/', userController.getUsers)
// File Management Routes
router.post('/upload', user_controller_1.userController.fileUpload);
router.delete('/delete/:filename', user_controller_1.userController.deleteFileData);
// Payment Gateway Routes
// Redirect URL will be in app.ts file, Here redirect URL will not work
/**
 * MIDDLEWARE CONFIGURATION
 * --------------------------------
 * */
router.get('/', verifyToken_middleware_1.default, auth_middleware_1.isAdmin, apiRateLimit_middleware_1.checkUserRoleAndRateLimit, user_controller_1.userController.getUsers);
exports.userRoutes = router;
