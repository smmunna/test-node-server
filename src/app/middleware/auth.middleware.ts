import { NextFunction, Request, Response } from "express";

const auth = (req: Request, res: Response, next: NextFunction) => {
    // Do your Authentication part Here
    console.log('Authentication')
    next()
}

export default auth;