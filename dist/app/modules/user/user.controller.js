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
exports.userController = void 0;
const user_service_1 = require("./user.service");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("./user.model"));
const sendApiResponse_1 = __importDefault(require("../../lib/ApiResponse/sendApiResponse"));
// Create user
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        const result = yield user_service_1.UserService.createUserToDB(user);
        (0, sendApiResponse_1.default)(res, 200, true, 'User created successfully', result);
    }
    catch (error) {
        next(error);
    }
});
// Get users
const getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.UserService.getAllUsers();
    (0, sendApiResponse_1.default)(res, 200, true, 'Users fetched successfully', result);
});
/**
 * JWT GENERATE TOKEN WHEN SIGN IN USER
 * -------------------------------------
 * When user will sign in, then jwt token will be generated.
 * You can use this jwt token in Authorization.
 * */
const signInUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    // const password = req.body.password;
    // const user = email
    /**
     * You can check the user email and password Here ;
     * If successfully login user, then sign token will be generated else Unauthorized user,Invalid Login
     * */
    // Check if the email exists in the database
    const user = yield user_model_1.default.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    // Sign in jwt token
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    const token = jsonwebtoken_1.default.sign({ user }, `${accessTokenSecret}`, {
        expiresIn: '1h'
    });
    res.status(200).json({
        success: true,
        user: user,
        token: token
    });
});
// File Uploading
const fileUpload = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // ========UPLOAD FILES LOCALLY=========
    // try {
    //     // Handle photo upload, only single photo
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
    // ===========END OF UPLOAD FILES LOCALLY=========
    //==============Upload into ImgBB===================
    // try {
    //     // Use the Multer middleware to handle the file upload
    //     cloudStore.single('photo')(req, res, async (err: any) => {
    //         if (err) {
    //             // Handle Multer error (e.g., file size exceeds limit)
    //             return res.status(400).send(err.message);
    //         }
    //         // Multer has processed the file, and it can be accessed in req.file
    //         const uploadedFile = req.file;
    //         if (!uploadedFile) {
    //             return res.status(400).json({ message: 'No file uploaded' });
    //         }
    //         // Convert buffer to a file path and upload to ImgBB
    //         const imgBBResponse = await imgbbUploader({
    //             apiKey: process.env.IMGBB_API_KEY, //IMGBB API Key from ENV file
    //             name: path.parse(uploadedFile.originalname).name, // Name for the image
    //             base64string: uploadedFile.buffer.toString('base64') // Convert file buffer to base64
    //         });
    //         // Respond with ImgBB response
    //         res.status(200).json({
    //             message: 'Photo uploaded successfully to ImgBB',
    //             data: imgBBResponse,
    //             imgbbUrl: imgBBResponse.url, // Direct URL to the image
    //             deleteUrl: imgBBResponse.delete_url // URL to delete the image from ImgBB
    //         });
    //     });
    // } catch (error) {
    //     console.error('Error in fileUpload controller:', error);
    //     res.status(500).send('Internal Server Error');
    // }
    //==============END OF UPLOADING INTO IMGBB===================
    //==============Upload into Cloudinary===================
    // try {
    //     // Configure Cloudinary
    //     cloudinary.v2.config({
    //         cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    //         api_key: process.env.CLOUDINARY_API_KEY,
    //         api_secret: process.env.CLOUDINARY_API_SECRET,
    //     });
    //     // Use Multer middleware to handle the file upload
    //     cloudStore.single('photo')(req, res, async (err: any) => {
    //         if (err) {
    //             // Handle Multer error (e.g., file size exceeds limit)
    //             return res.status(400).send(err.message);
    //         }
    //         // Multer has processed the file, and it can be accessed in req.file
    //         const uploadedFile = req.file;
    //         if (!uploadedFile) {
    //             return res.status(400).json({ message: 'No file uploaded' });
    //         }
    //         // Upload the image to Cloudinary
    //         cloudinary.v2.uploader.upload_stream(
    //             { resource_type: 'image' },
    //             (error, result) => {
    //                 if (error) {
    //                     console.error('Error uploading to Cloudinary:', error);
    //                     return res.status(500).json({ message: 'Error uploading to Cloudinary', error });
    //                 }
    //                 // Respond with Cloudinary response
    //                 res.status(200).json({
    //                     message: 'Photo uploaded successfully to Cloudinary',
    //                     // data: result,
    //                     imgUrl: result?.secure_url, // Direct URL to the image
    //                     publicId: result?.public_id, // Public ID of the image in Cloudinary
    //                 });
    //             }
    //         ).end(uploadedFile.buffer); // Send the file buffer to Cloudinary
    //     });
    // } catch (error) {
    //     console.error('Error in fileUpload controller:', error);
    //     res.status(500).send('Internal Server Error');
    // }
    //==============END OF UPLOADING INTO CLOUDINARY===================
});
// File Deleting
const deleteFileData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*
    When you want to delete any product or delete any user information with their photo or other files.
    This deleting method will help you.
    Just fetch the data from database then you will get photo url. just pass this url to parsedURL() method, then
    deleteFastFile() will delete the file
    */
    // ===============DELETE LOCAL FILE============
    // const path = 'http://localhost:5000/uploads/user-1728138253071.png'
    // const urlconversion = parsedURL(path) // convert into uploads/user-1728138253071.png like this
    // if (urlconversion) {
    //     deleteFastFile(urlconversion) // takes the file path as parameter, uploads/user-3843.png and delete it.
    //     sendApiResponse(res, 200, true, 'Deleted file successfully')
    // }
    // else {
    //     console.log('Not Deleted, Try again later')
    // }
    // ===============END OF DELETING LOCAL FILE============
    //==========DELETE IMAGE FROM CLOUDINARY============
    // const publicId = req.query.publicId as string; // Get publicId from the query parameter
    // if (!publicId) {
    //     return res.status(400).json({ message: 'No public ID provided' });
    // }
    // try {
    //     const result = await deleteImageFromCloudinary(publicId); // Function will delete the image
    //     if (result.result === 'ok') {
    //         res.status(200).json({ message: 'Image deleted successfully from Cloudinary' });
    //     } else {
    //         res.status(400).json({ message: 'Failed to delete image from Cloudinary', result });
    //     }
    // } catch (error: any) {
    //     console.error(error);
    //     res.status(500).json({ message: error.message });
    // }
    // ==========END OF DELETE IMAGE FROM CLOUDINARY =====
});
// These are accessible from different files.
exports.userController = {
    createUser,
    getUsers,
    signInUser,
    fileUpload,
    deleteFileData
};
