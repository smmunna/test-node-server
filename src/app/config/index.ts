import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.join(process.cwd(), '.env') });

const app = express();

// CORS Configuration
const allowedDomains = [
  'http://localhost:5173', // Default React.js frontend local domain URL
  'http://production-domain.com', // Add more domains as needed
];

// CORS middleware
const corsConfig = cors({
  origin: (origin: string | undefined, callback: Function) => {
    if (allowedDomains.includes(origin!) || !origin) {
      callback(null, true); // Allow if the origin is in the allowed list or if there's no origin (e.g., Postman)
    } else {
      callback(new Error('Unauthorized: You do not have correct domain access.'));
    }
  },
  credentials: true, // Enable if you want to allow cookies with the requests
});

// Use the CORS middleware
app.use(corsConfig);

// Configuration Export
export default {
  // Port Number
  port: process.env.PORT || 5000,

  // MongoDB configuration
  mongodbUrl: process.env.DATABASE_URL,

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
