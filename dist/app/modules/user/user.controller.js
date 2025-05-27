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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("./user.model"));
const sendApiResponse_1 = __importDefault(require("../../lib/ApiResponse/sendApiResponse"));
const config_1 = __importDefault(require("../../config"));
const dbQuery_1 = require("../../lib/dbQuery");
// Create user in this controller
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        const result = yield (0, dbQuery_1.insertOne)('user', user);
        (0, sendApiResponse_1.default)(res, 200, true, 'User created successfully', result);
    }
    catch (error) {
        next(error);
    }
});
// Get users
const getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const result = await UserService.getAllUsers();
    try {
        const result = yield (0, dbQuery_1.findAll)('user', {}, {}, { sortField: 'age', sortOrder: 'asc' });
        (0, sendApiResponse_1.default)(res, 200, true, 'Users fetched successfully', result);
    }
    catch (error) {
        console.log(error);
    }
});
/**
 * JWT GENERATE TOKEN WHEN SIGN IN USER
 * -------------------------------------
 * When user will sign in, then jwt token will be generated.
 * You can use this jwt token in Authorization.
 * */
const signInUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    // const password = req.body.password;
    // const user = email
    /**
     * You can check the user email and password Here ;
     * If successfully login user, then sign token will be generated else Unauthorized user,Invalid Login
     * */
    // Check if the email exists in the database
    const user = yield user_model_1.default.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    // Sign in jwt token
    const accessTokenSecret = config_1.default.jwt_secret_token;
    const accessExpire = config_1.default.jwt_expire_time;
    const token = jsonwebtoken_1.default.sign({ user }, `${accessTokenSecret}`, {
        expiresIn: `${accessExpire}`,
    });
    res.status(200).json({
        success: true,
        user: user,
        token: token,
    });
});
// These are accessible from different files.
exports.userController = {
    createUser,
    getUsers,
    signInUser,
};
