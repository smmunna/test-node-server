"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.post('/', user_controller_1.userController.createUser);
router.post('/login', user_controller_1.userController.signInUser);
router.get('/', user_controller_1.userController.getUsers);
// Any Redirect URL will be in app.ts file, Here redirect URL will not work
/**
 * MIDDLEWARE CONFIGURATION
 * --------------------------------
 * */
// router.get('/', verifyToken, isAdmin, checkUserRoleAndRateLimit, userController.getUsers)
exports.userRoutes = router;
