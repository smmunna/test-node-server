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
exports.isUser = exports.isAdmin = void 0;
const user_model_1 = __importDefault(require("../modules/user/user.model"));
const sendApiResponse_1 = __importDefault(require("../lib/ApiResponse/sendApiResponse"));
// Reusable function to check user role
const checkUserRole = (req, res, next, role) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.email; // Accessing email from the request object
    // Finding the user by email
    const user = yield user_model_1.default.findOne({ email });
    if (user && user.role === role) {
        next(); // If user has the correct role, proceed to the next middleware
    }
    else {
        (0, sendApiResponse_1.default)(res, 403, false, `User role not found as ${role}`);
    }
});
// Middleware for admin role
const isAdmin = (req, res, next) => {
    checkUserRole(req, res, next, 'admin');
};
exports.isAdmin = isAdmin;
// Middleware for user role
const isUser = (req, res, next) => {
    checkUserRole(req, res, next, 'user');
};
exports.isUser = isUser;
// Here you can add more middleware for role, just call checkUserRole function and pass your role parameter....
