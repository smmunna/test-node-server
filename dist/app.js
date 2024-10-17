"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
// Import your routes here
const user_route_1 = require("./app/modules/user/user.route");
const helmet_1 = __importDefault(require("helmet"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Helmet for Security purpose, hiding the 'Express' server name from Header
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" }));
// Handling uploading the files to server
app.use('/uploads', express_1.default.static('uploads'));
// Allow only requests from a specific domain, frontend domain url eg. http://www.example.com
const allowedDomains = ['http://localhost:5173', 'http://localhost:8081']; // default React.js, react-native frontend local domain url
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        if (allowedDomains.includes(origin) || !origin) { // Allow if the request is from the allowed domain or if there's no origin (e.g., from Postman)
            callback(null, true);
        }
        else {
            callback(new Error('Access blocked: CORS policy does not allow this domain'));
        }
    },
    credentials: true, // Enable if you want to allow cookies with the request
}));
// Route handlings;
app.use('/api/v1/users', user_route_1.userRoutes);
// SSL Commerze or any redirect routes will be Here, from controller with functions
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to Node.js Server',
        author: 'Minhazul Abedin Munna',
        github: 'https://github.com/smmunna',
        linkedin: 'https://www.linkedin.com/in/minhazulabedinmunna/',
    });
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
