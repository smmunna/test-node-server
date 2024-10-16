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
// @ts-ignore
const imgbb_uploader_1 = __importDefault(require("imgbb-uploader"));
const path_1 = __importDefault(require("path"));
const user_model_1 = __importDefault(require("./user.model"));
const sendApiResponse_1 = __importDefault(require("../../lib/ApiResponse/sendApiResponse"));
const cloudStore_1 = __importDefault(require("../../utils/fileManagement/cloudStore"));
const deleteFastFile_1 = __importDefault(require("../../lib/file/deleteFastFile"));
const photoPath_1 = __importDefault(require("../../lib/file/photoPath"));
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
 * When user will sign in, then jwt token will be generated
 * */
const signInUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    // const password = req.body.password;
    // const user = email
    /**
     * You can check the user email and password Here ;
     * If successful user, then sign token and login successful else Unauthorized user,Invalid Login
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
        cloudStore_1.default.single('photo')(req, res, (err) => __awaiter(void 0, void 0, void 0, function* () {
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
            const imgBBResponse = yield (0, imgbb_uploader_1.default)({
                apiKey: process.env.IMGBB_API_KEY, //IMGBB API Key from ENV file
                name: path_1.default.parse(uploadedFile.originalname).name, // Name for the image
                base64string: uploadedFile.buffer.toString('base64') // Convert file buffer to base64
            });
            // Respond with ImgBB response
            res.status(200).json({
                message: 'Photo uploaded successfully to ImgBB',
                imgbbUrl: imgBBResponse.url, // Direct URL to the image
                deleteUrl: imgBBResponse.delete_url // URL to delete the image from ImgBB
            });
        }));
    }
    catch (error) {
        console.error('Error in fileUpload controller:', error);
        res.status(500).send('Internal Server Error');
    }
    //==============END OF UPLOADING INTO IMGBB===================
});
// File Deleting
const deleteFileData = (req, res) => {
    // When you upload a file into the database , that url will be here
    const path = 'http://localhost:5000/uploads/user-1728138253071.png';
    const urlconversion = (0, photoPath_1.default)(path);
    if (urlconversion) {
        (0, deleteFastFile_1.default)(urlconversion);
        (0, sendApiResponse_1.default)(res, 200, true, 'Deleted file successfully');
    }
    else {
        console.log('Not Deleted, Try again later');
    }
};
// These are accessible from different files.
exports.userController = {
    createUser,
    getUsers,
    signInUser,
    fileUpload,
    deleteFileData
};
