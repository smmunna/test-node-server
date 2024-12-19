"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
// Creating Schema
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    email: { type: String },
    password: { type: String, required: true },
    role: { type: String },
});
// Pre-save hook to hash the password
userSchema.pre('save', function (next) {
    const user = this;
    // Hash the password only if it's new or modified
    if (!user.isModified('password'))
        return next();
    bcrypt_1.default.hash(user.password, 10, (err, hash) => {
        if (err)
            return next(err);
        user.password = hash;
        next();
    });
});
// Creating a Model
const userModel = (0, mongoose_1.model)('user', userSchema);
exports.default = userModel;
/*
const userSchema = new Schema({
    username: { type: String, required: true, maxlength: 20, trim: true },
    email: { type: String, unique: true, lowercase: true, match: /\S+@\S+\.\S+/ },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: ['user', 'admin', 'guest'], default: 'user' },
    age: { type: Number, min: 18, max: 65 }
}, { timestamps: true });

In controller
----------------------------------------------------------------
const user = await userModel.findOne({ username });
const isMatch = await user.comparePassword(inputPassword);

*/
