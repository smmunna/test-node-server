import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";
import jwt from "jsonwebtoken";
import upload from "../../utils/fileManagement/upload";
// @ts-ignore
import imgbbUploader from 'imgbb-uploader';
import path from 'path'
import deleteFile from "../../utils/fileManagement/deleteFile";
import userModel from "./user.model";
import sendApiResponse from "../../lib/ApiResponse/sendApiResponse";

// Create user
const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.body;
        const result = await UserService.createUserToDB(user)
        sendApiResponse(res, 200, true, 'User created successfully', result)
    } catch (error) {
        next(error);
    }
}

// Get users
const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        success: true,
        data:"User gets successfully"
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

    // const user = email

    /**
     * You can check the user email and password Here ;
     * If successful user, then sign token and login successful else Unauthorized user,Invalid Login
     * */

    // Check if the email exists in the database
    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

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


// File Uploading
const fileUpload = async (req: Request, res: Response) => {

    //============== Upload into local server folder ====================
    // try {
    //     // Use the Multer middleware to handle the file upload
    //     upload.single('photo')(req, res, (err: any) => {
    //         if (err) {
    //             // Handle Multer error (e.g., file size exceeds limit)
    //             return res.status(400).send(err.message);
    //         }

    //         // Multer has processed the file, and it can be accessed in req.file
    //         const uploadedFile = req.file;

    //         // Respond with the uploaded file in the response
    //         res.status(200).json({
    //             message: 'Photo uploaded successfully',
    //             file: uploadedFile,
    //             nextUrl: `${req.protocol}://${req.get('host')}/` + uploadedFile?.path.replace(/\\/g, "/")
    //         });
    //     });
    // } catch (error) {
    //     console.error('Error in userPhoto controller:', error);
    //     res.status(500).send('Internal Server Error');
    // }

    //==============End of upload into Local server folder===============


    //==============Upload into ImgBB===================
    try {
        // Use the Multer middleware to handle the file upload
        upload.single('photo')(req, res, async (err: any) => {
            if (err) {
                // Handle Multer error (e.g., file size exceeds limit)
                return res.status(400).send(err.message);
            }

            // Multer has processed the file, and it can be accessed in req.file
            const uploadedFile = req.file;

            if (!uploadedFile) {
                return res.status(400).json({ message: 'No file uploaded' });
            }

            // Convert buffer to a file path and upload to ImgBB
            const imgBBResponse = await imgbbUploader({
                apiKey: process.env.IMGBB_API_KEY, //IMGBB API Key from ENV file
                name: path.parse(uploadedFile.originalname).name, // Name for the image
                base64string: uploadedFile.buffer.toString('base64') // Convert file buffer to base64
            });

            // Respond with ImgBB response
            res.status(200).json({
                message: 'Photo uploaded successfully to ImgBB',
                imgbbUrl: imgBBResponse.url, // Direct URL to the image
                deleteUrl: imgBBResponse.delete_url // URL to delete the image from ImgBB
            });
        });
    } catch (error) {
        console.error('Error in fileUpload controller:', error);
        res.status(500).send('Internal Server Error');
    }

    //==============END OF UPLOADING INTO IMGBB===================

}

// File Deleting
const deleteFileData = (req: Request, res: Response) => {
    const filename = req.params.filename;
    // console.log(filename);

    // Call deleteFile function with filename and handle the result
    deleteFile(filename, (error, message) => {
        if (error) {
            res.status(500).send({ message: error.message }); // Handle error
        } else {
            res.send({ message: message }); // File deletion successful
        }
    });


}


// These are accessible from different files.
export const userController = {
    createUser,
    getUsers,
    signInUser,
    fileUpload,
    deleteFileData
}