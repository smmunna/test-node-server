import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";
import jwt from "jsonwebtoken";

// Create user
const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.body;
        const result = await UserService.createUserToDB(user)
        res.status(200).json({
            success: true,
            message: 'User created successfully',
            data: result
        })
    } catch (error) {
        next(error);
    }
}

// Get users
const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        success: true,
    });
}


/**
 * JWT GENERATE TOKEN WHEN SIGN IN USER
 * -------------------------------------
 * When user will sign in, then jwt token will be generated
 * */

const signInUser = async (req: Request, res: Response, next: NextFunction) => {
    const email = req.body.email;
    // const password = req.body.password;

    const user = email

    /**
     * You can check the user email and password Here ;
     * If successful user, then sign token and login successful else Unauthorized user,Invalid Login
     * */

    // Sign in jwt token
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    const token = jwt.sign({ user }, `${accessTokenSecret}`, {
        expiresIn: '1h'
    })

    res.status(200).json({
        success: true,
        user: user,
        token: token
    });
}

// These are accessible from different files.
export const userController = {
    createUser,
    getUsers,
    signInUser,
}