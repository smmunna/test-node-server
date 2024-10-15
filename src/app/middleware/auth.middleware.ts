import { NextFunction, Request, Response } from "express";
import userModel from "../modules/user/user.model";
import sendApiResponse from "../lib/ApiResponse/sendApiResponse";

// Reusable function to check user role
const checkUserRole = async (req: Request, res: Response, next: NextFunction, role: string) => {
    const email = req.email; // Accessing email from the request object

    // Finding the user by email
    const user = await userModel.findOne({ email });
    if (user && user.role === role) {
        next(); // If user has the correct role, proceed to the next middleware
    } else {
        sendApiResponse(res, 403, false, `User role not found as ${role}`);
    }
};

// Middleware for admin role
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    checkUserRole(req, res, next, 'admin');
};

// Middleware for user role
export const isUser = (req: Request, res: Response, next: NextFunction) => {
    checkUserRole(req, res, next, 'user');
};

// Here you can add more middleware for role, just call checkUserRole function and pass your role parameter....
