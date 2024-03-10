"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("./user.service");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Create user
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        const result = yield user_service_1.UserService.createUserToDB(user);
        res.status(200).json({
            success: true,
            message: 'User created successfully',
            data: result
        });
    }
    catch (error) {
        next(error);
    }
});
// Get users
const getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({
        success: true,
    });
});
/**
 * JWT GENERATE TOKEN WHEN SIGN IN USER
 * -------------------------------------
 * When user will sign in, then jwt token will be generated
 * */
const signInUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    // const password = req.body.password;
    const user = email;
    /**
     * You can check the user email and password Here ;
     * If successful user, then sign token and login successful else Unauthorized user,Invalid Login
     * */
    // Sign in jwt token
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    const token = jsonwebtoken_1.default.sign({ user }, `${accessTokenSecret}`, {
        expiresIn: '1h'
    });
    res.status(200).json({
        success: true,
        user: user,
        token: token
    });
});
// These are accessible from different files.
exports.userController = {
    createUser,
    getUsers,
    signInUser,
};
