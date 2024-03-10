"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth = (req, res, next) => {
    // Do your Authentication part Here
    console.log('Authentication');
    next();
};
exports.default = auth;
