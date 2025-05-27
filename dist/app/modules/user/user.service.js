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
exports.UserService = void 0;
const QueryBuilder_1 = __importDefault(require("../../lib/QueryBuilder"));
const user_model_1 = __importDefault(require("./user.model"));
// Creating new user
const createUserToDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.create(user);
    return result;
});
// Getting all users
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const query = { email: 'tanydx@gmail.com' }; // Match all users
    const projection = { password: 0, role: 0 }; // Exclude password and role
    return yield QueryBuilder_1.default.Paginate(user_model_1.default, {}, projection, 1, 2, { username: -1 });
});
exports.UserService = {
    createUserToDB,
    getAllUsers,
};
