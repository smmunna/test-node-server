"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendApiResponse = (res, statusCode, success, message, result) => {
    // Disable caching
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    const response = {
        success,
        message,
        result,
    };
    return res.status(statusCode).json(response);
};
exports.default = sendApiResponse;
