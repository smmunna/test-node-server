"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.anyFileUpload = exports.fileUpload = exports.audioUpload = exports.videoUpload = exports.photosUpload = exports.photoUpload = exports.documentUpload = void 0;
const multer_config_1 = __importDefault(require("./multer.config"));
/**
 * Configure multer for uploading documents.
 *
 * @param {string} fieldName - The name of the field in the form.
 * @param {string[]} allowedMimeTypes - Array of allowed MIME types.
 * @param {string} destinationPath - The destination directory for storing uploaded files.
 * @param {string} filenamePrefix - Prefix for generated file names.
 * @param {number} fileSizeLimit - Maximum allowed file size in bytes.
 * @returns {object} - Configured multer instance.
 */
const documentUpload = (0, multer_config_1.default)('doc', // fieldName
['application/pdf'], // allowedMimeTypes
'./uploads/documents/', // destinationPath
'document', // filenamePrefix
5000000);
exports.documentUpload = documentUpload;
/**
 * Configure multer for uploading photos.
 *
 * @param {string} fieldName - The name of the field in the form.
 * @param {string[]} allowedMimeTypes - Array of allowed MIME types.
 * @param {string} destinationPath - The destination directory for storing uploaded files.
 * @param {string} filenamePrefix - Prefix for generated file names.
 * @param {number} fileSizeLimit - Maximum allowed file size in bytes.
 * @returns {object} - Configured multer instance.
 */
const photoUpload = (0, multer_config_1.default)('photo', // fieldName
['image/jpeg', 'image/png', 'image/jpg'], // allowedMimeTypes
'./uploads/photos/', // destinationPath
'photo', // filenamePrefix
1000000);
exports.photoUpload = photoUpload;
/**
 * Configure multer for uploading photos.
 *
 * @param {string} fieldName - The name of the field in the form (photos).
 * @param {string[]} allowedMimeTypes - Array of allowed MIME types.
 * @param {string} destinationPath - The destination directory for storing uploaded files.
 * @param {string} filenamePrefix - Prefix for generated file names.
 * @param {number} fileSizeLimit - Maximum allowed file size in bytes.
 * @returns {object} - Configured multer instance.
 */
const photosUpload = (0, multer_config_1.default)('photos', // fieldName
['image/jpeg', 'image/png', 'image/jpg'], // allowedMimeTypes
'./uploads/photos/', // destinationPath
'photo', // filenamePrefix
1000000);
exports.photosUpload = photosUpload;
/**
 * Configure multer for uploading videos.
 *
 * @param {string} fieldName - The name of the field in the form.
 * @param {string[]} allowedMimeTypes - Array of allowed MIME types.
 * @param {string} destinationPath - The destination directory for storing uploaded files.
 * @param {string} filenamePrefix - Prefix for generated file names.
 * @param {number} fileSizeLimit - Maximum allowed file size in bytes.
 * @returns {object} - Configured multer instance.
 */
const videoUpload = (0, multer_config_1.default)('video', // fieldName
['video/mp4', 'video/mpeg'], // allowedMimeTypes
'./uploads/videos/', // destinationPath
'video', // filenamePrefix
50000000);
exports.videoUpload = videoUpload;
/**
 * Configure multer for uploading audio files.
 *
 * @param {string} fieldName - The name of the field in the form.
 * @param {string[]} allowedMimeTypes - Array of allowed MIME types.
 * @param {string} destinationPath - The destination directory for storing uploaded files.
 * @param {string} filenamePrefix - Prefix for generated file names.
 * @param {number} fileSizeLimit - Maximum allowed file size in bytes.
 * @returns {object} - Configured multer instance.
 */
const audioUpload = (0, multer_config_1.default)('audio', // fieldName
['audio/mpeg', 'audio/wav'], // allowedMimeTypes
'./uploads/audio/', // destinationPath
'audio', // filenamePrefix
20000000);
exports.audioUpload = audioUpload;
/**
 * Configure multer for uploading general files.
 *
 * @param {string} fieldName - 'file' The name of the field in the form.
 * @param {string[]} allowedMimeTypes - ['application/pdf', 'application/msword', 'application/vnd.ms-excel'], Array of allowed MIME types.
 * @param {string} destinationPath - './uploads/files/' The destination directory for storing uploaded files.
 * @param {string} filenamePrefix - Prefix for generated file names.
 * @param {number} fileSizeLimit - 10 MB Maximum allowed file size in bytes.
 * @returns {object} - Configured multer instance.
 */
const fileUpload = (0, multer_config_1.default)('file', // fieldName
[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
], // allowedMimeTypes
'./uploads/files/', // destinationPath
'file', // filenamePrefix
10000000);
exports.fileUpload = fileUpload;
/**
 * Configure multer for uploading any type of file.
 *
 * @param {string} fieldName - 'file' The name of the field in the form.
 * @param {string} destinationPath - './uploads/files/' The destination directory for storing uploaded files.
 * @param {string} filenamePrefix - 'file' Prefix for generated file names.
 * @param {number} fileSizeLimit - 10MB Maximum allowed file size in bytes.
 * @returns {object} - Configured multer instance.
 */
const anyFileUpload = (0, multer_config_1.default)('file', // fieldName
['*/*'], // allowedMimeTypes (Wildcard MIME type to accept any file type)
'./uploads/files/', // destinationPath
'file', // filenamePrefix
10000000);
exports.anyFileUpload = anyFileUpload;
