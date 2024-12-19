"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
exports.default = {
    // Port Number
    port: process.env.PORT || 5000,
    // mongodb configuration
    mongodbUrl: process.env.DATABASE_URL,
    // jwt configuration
    jwt_secret_token: process.env.ACCESS_TOKEN_SECRET,
    jwt_expire_time: process.env.JWT_ACCESS_EXPIRES_IN,
    // mail configuration
    mail_host: process.env.MAIL_HOST,
    mail_port: process.env.MAIL_PORT,
    mail_username: process.env.MAIL_USERNAME,
    mail_password: process.env.MAIL_PASSWORD,
    // ssl commerze configuration
    ssl_storeId: process.env.STORE_ID,
    ssl_password: process.env.STORE_PASSWORD,
    ssl_isLive: process.env.IS_LIVE,
    // # Backend function calling for success, failure, cancellation
    payment_success_url: process.env.PAYMENT_SUCCESS_URL,
    payment_fail_url: process.env.PAYMENT_FAIL_URL,
    payment_cancel_url: process.env.PAYMENT_CANCEL_URL,
    payment_ipn_url: process.env.PAYMENT_IPN_URL,
    // # Frontend function calling for success, failure, cancellation
    frontend_success_url: process.env.FRONTEND_SUCCESS_URL,
    frontend_fail_url: process.env.FRONTEND_FAIL_URL,
    frontend_cancel_url: process.env.FRONTEND_CANCEL_URL,
    frontend_ipn_url: process.env.FRONTEND_IPN_URL,
    // Stripe configuration
    stripe_secret_key: process.env.STRIPE_SECRET_KEY,
    // Paypal configuration
    paypal_client_id: process.env.PAYPAL_CLIENT_ID,
    paypal_client_secret: process.env.PAYPAL_CLIENT_SECRET,
    // imgbb api configuration
    imgbb_api_key: process.env.IMGBB_API_KEY,
    // Cloudinary APi configuration
    cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
    cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET
};
