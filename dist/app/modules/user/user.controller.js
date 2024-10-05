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
const upload_1 = __importDefault(require("../../utils/fileManagement/upload"));
// @ts-ignore
const imgbb_uploader_1 = __importDefault(require("imgbb-uploader"));
const path_1 = __importDefault(require("path"));
const deleteFile_1 = __importDefault(require("../../utils/fileManagement/deleteFile"));
// Create user
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        const result = yield user_service_1.UserService.createUserToDB(user);
        res.status(200).json({
            success: true,
            message: 'User created successfully',
            data: result
        });
    }
    catch (error) {
        next(error);
    }
});
// Get users
const getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({
        success: true,
    });
});
/**
 * JWT GENERATE TOKEN WHEN SIGN IN USER
 * -------------------------------------
 * When user will sign in, then jwt token will be generated
 * */
const signInUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    // const password = req.body.password;
    const user = email;
    /**
     * You can check the user email and password Here ;
     * If successful user, then sign token and login successful else Unauthorized user,Invalid Login
     * */
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
const fileUpload = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        upload_1.default.single('photo')(req, res, (err) => __awaiter(void 0, void 0, void 0, function* () {
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
    const filename = req.params.filename;
    // console.log(filename);
    // Call deleteFile function with filename and handle the result
    (0, deleteFile_1.default)(filename, (error, message) => {
        if (error) {
            res.status(500).send({ message: error.message }); // Handle error
        }
        else {
            res.send({ message: message }); // File deletion successful
        }
    });
};
// These are accessible from different files.
exports.userController = {
    createUser,
    getUsers,
    signInUser,
    fileUpload,
    deleteFileData
};
