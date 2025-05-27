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
exports.deleteImageFromCloudinary = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
const config_1 = __importDefault(require("../../config"));
// Configure Cloudinary (can be done globally)
cloudinary_1.default.v2.config({
    cloud_name: config_1.default.cloudinary_cloud_name,
    api_key: config_1.default.cloudinary_api_key,
    api_secret: config_1.default.cloudinary_api_secret,
});
// Function to delete an image from Cloudinary using publicId
/**
 * @description
 * Delete an image from Cloudinary
 * @param {string} publicId
 * */
const deleteImageFromCloudinary = (publicId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!publicId) {
        throw new Error('No public ID provided');
    }
    try {
        const result = yield cloudinary_1.default.v2.uploader.destroy(publicId, {
            resource_type: 'image',
        });
        return result;
    }
    catch (error) {
        throw new Error(`Error deleting image from Cloudinary: ${error.message}`);
    }
});
exports.deleteImageFromCloudinary = deleteImageFromCloudinary;
