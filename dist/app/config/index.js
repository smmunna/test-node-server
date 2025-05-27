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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const mongoose_1 = __importDefault(require("mongoose"));
// Load environment variables
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
const app = (0, express_1.default)();
// Parse allowed domains from .env file
const allowedDomains = process.env.ALLOWED_DOMAINS
    ? process.env.ALLOWED_DOMAINS.split(',').map(domain => domain.trim())
    : []; // Default to an empty array if not defined
// CORS middleware
const corsConfig = (0, cors_1.default)({
    origin: (origin, callback) => {
        if (allowedDomains.includes(origin) || !origin) {
            callback(null, true); // Allow if the origin is in the allowed list or if there's no origin (e.g., Postman)
        }
        else {
            callback(new Error('Unauthorized: You do not have correct domain access.'));
        }
    },
    credentials: true, // Enable if you want to allow cookies with the requests
});
// Use the CORS middleware
app.use(corsConfig);
// MongoDB Connection Function
function connectMongoDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const mongodbUrl = process.env.DATABASE_URL;
            if (!mongodbUrl) {
                throw new Error('DATABASE_URL is not defined in .env file.');
            }
            yield mongoose_1.default.connect(mongodbUrl);
            console.log('MongoDB Connected Successfully.');
        }
        catch (error) {
            console.error('Failed to connect to MongoDB:', error);
            throw error; // the error for better handling
        }
    });
}
// Configuration Export
exports.default = {
    // Port Number
    port: process.env.PORT || 5000,
    // mongodb connection
    connectMongoDB,
    // JWT configuration
    jwt_secret_token: process.env.ACCESS_TOKEN_SECRET,
    jwt_expire_time: process.env.JWT_ACCESS_EXPIRES_IN,
    // Mail configuration
    mail_host: process.env.MAIL_HOST,
    mail_port: process.env.MAIL_PORT,
    mail_username: process.env.MAIL_USERNAME,
    mail_password: process.env.MAIL_PASSWORD,
    // SSL Commerz configuration
    ssl_storeId: process.env.STORE_ID,
    ssl_password: process.env.STORE_PASSWORD,
    ssl_isLive: process.env.IS_LIVE,
    // Backend function calling for success, failure, cancellation
    payment_success_url: process.env.PAYMENT_SUCCESS_URL,
    payment_fail_url: process.env.PAYMENT_FAIL_URL,
    payment_cancel_url: process.env.PAYMENT_CANCEL_URL,
    payment_ipn_url: process.env.PAYMENT_IPN_URL,
    // Frontend function calling for success, failure, cancellation
    frontend_success_url: process.env.FRONTEND_SUCCESS_URL,
    frontend_fail_url: process.env.FRONTEND_FAIL_URL,
    frontend_cancel_url: process.env.FRONTEND_CANCEL_URL,
    frontend_ipn_url: process.env.FRONTEND_IPN_URL,
    // Stripe configuration
    stripe_secret_key: process.env.STRIPE_SECRET_KEY,
    // Paypal configuration
    paypal_client_id: process.env.PAYPAL_CLIENT_ID,
    paypal_client_secret: process.env.PAYPAL_CLIENT_SECRET,
    // ImgBB API configuration
    imgbb_api_key: process.env.IMGBB_API_KEY,
    // Cloudinary API configuration
    cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
    cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
    // Cors configuration
    corsConfig: corsConfig, // Export CORS config to be used elsewhere
};
