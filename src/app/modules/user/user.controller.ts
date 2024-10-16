import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";
import jwt from "jsonwebtoken";
// @ts-ignore
import imgbbUploader from 'imgbb-uploader';
import path from 'path'
import deleteFile from "../../utils/fileManagement/deleteFile";
import userModel from "./user.model";
import sendApiResponse from "../../lib/ApiResponse/sendApiResponse";
import cloudStore from "../../utils/fileManagement/cloudStore";
import deleteFastFile from "../../lib/file/deleteFastFile";
import parsedURL from "../../lib/file/photoPath";
import { photoUpload } from "../../utils/fileManagement/upload.config";

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
    const result = await UserService.getAllUsers();
    sendApiResponse(res, 200, true, 'Users fetched successfully', result)
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
const fileUpload = async (req: Request, res: Response, next: NextFunction) => {

    // UPLOAD FILES LOCALLY
    // try {
    //     // Handle photo upload
    //     photoUpload.single('photo')(req, res, async (err) => {
    //         if (err) {
    //             console.error('Error uploading photo:', err);
    //             return next(err);
    //         }

    //         const photoPath = req.file?.path;
    //         const photoURL = `${req.protocol}://${req.get('host')}/` + photoPath?.replace(/\\/g, "/"); //Upload file as URL: http://localhost:5000/uploads/user-1728138253070.png
    //         if (photoURL) {
    //             sendApiResponse(res, 200, true, 'Photo Uploaded Successfully', photoURL)
    //         }
    //         else {
    //             sendApiResponse(res, 400, false, 'Error Uploading Photo')
    //         }

    //     })
    // }
    // catch (error) {
    //     next(error)
    // }

    // END OF UPLOAD FILES LOCALLY


    //==============Upload into ImgBB===================
    try {
        // Use the Multer middleware to handle the file upload
        cloudStore.single('photo')(req, res, async (err: any) => {
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

    // When you upload a file into the database , that url will be here

    const path = 'http://localhost:5000/uploads/user-1728138253071.png'
    const urlconversion = parsedURL(path)
    if (urlconversion) {
        deleteFastFile(urlconversion)
        sendApiResponse(res, 200, true, 'Deleted file successfully')
    }
    else {
        console.log('Not Deleted, Try again later')
    }
}


// These are accessible from different files.
export const userController = {
    createUser,
    getUsers,
    signInUser,
    fileUpload,
    deleteFileData
}