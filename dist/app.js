"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const body_parser_1 = __importDefault(require("body-parser"));
const orders_controller_1 = require("./app/modules/orders/orders.controller");
const routes_1 = __importDefault(require("./app/routes"));
const config_1 = __importDefault(require("./app/config"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(body_parser_1.default.json()); // for parsing application/json
app.use(body_parser_1.default.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use((0, cors_1.default)());
// Helmet for Security purpose, hiding the 'Express' server name from Header
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: 'cross-origin' }));
// Handling uploading the files to server
app.use('/uploads', express_1.default.static('uploads'));
/*
Payment Gateway redirection URL 'success, fail and cancel'
Don't move after the cors policy, it will not work there.
Because we are serving the payment gateway by using another server url (e.g. https://sslcommerze.com/api/payment)
Will show the response like Access Blocked. [by default sslcommerze, you can use others payment gateway]
*/
app.use('/success/:tranId', orders_controller_1.orderController.success);
app.use('/fail/:tranId', orders_controller_1.orderController.fail);
app.use('/cancel/:tranId', orders_controller_1.orderController.cancel);
// Allow only requests from a specific domain, frontend domain url eg. http://www.example.com, modify- src/app/config/index.ts
app.use(config_1.default.corsConfig);
/*-------------------HANDLE ALL OF YOUR ROUTES HERE ----------------------*/
app.use('/api/v1', routes_1.default); //Main routes
/*-------------------HANDLE ALL OF YOUR ROUTES HERE ----------------------*/
// Home route json messages
app.get('/', (req, res) => {
    const currentYear = new Date().getFullYear();
    res.status(200).json({
        success: true,
        message: 'Welcome to Node.js Server',
        author: 'Minhazul Abedin Munna',
        github: 'https://github.com/smmunna',
        linkedin: 'https://www.linkedin.com/in/minhazulabedinmunna/',
        year: '2024-' + currentYear + '©',
    });
});
// Route Error for any  url not found .
app.all('*', (req, res) => {
    res.status(404).json({
        status: 404,
        message: 'Not Found',
    });
});
// Global Error Handler
app.use((error, req, res, next) => {
    if (error) {
        res.status(500).send({
            success: false,
            message: error.message,
        });
    }
});
exports.default = app;
