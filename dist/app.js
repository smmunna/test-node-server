"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const user_route_1 = require("./app/modules/user/user.route");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Route handlings;
app.use('/api/v1/users', user_route_1.userRoutes);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
// Route Error
app.all('*', (req, res) => {
    res.status(404).json({
        status: 404,
        message: 'Not Found'
    });
});
// Global Error Handler
app.use((error, req, res, next) => {
    if (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
});
exports.default = app;
