import { NextFunction, Request, Response } from 'express';
import { UserService } from './user.service';
import jwt from 'jsonwebtoken';
// @ts-ignore
import imgbbUploader from 'imgbb-uploader';
import cloudinary from 'cloudinary';
import path from 'path';
import fs from 'fs';
import userModel from './user.model';
import sendApiResponse from '../../lib/ApiResponse/sendApiResponse';
import cloudStore from '../../utils/fileManagement/cloudStore';
import deleteFastFile from '../../lib/file/deleteFastFile';
import parsedURL from '../../lib/file/parsedUrl';
import {
  photosUpload,
  photoUpload,
} from '../../utils/fileManagement/upload.config';
import axios from 'axios';
import { deleteImageFromCloudinary } from '../../lib/cloudinary/deleteImage';
import config from '../../config';
import { saveFile } from '../../lib/file/saveFile';
import { findAll, insertMany, insertOne, join, max, min, orderBy, paginate, search } from '../../lib/dbQuery';

// Create user in this controller
const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.body;
    const result = await insertOne('user', user);
    sendApiResponse(res, 200, true, 'User created successfully', result);
  } catch (error) {
    next(error);
  }
};

// Get users
const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  // const result = await UserService.getAllUsers();
  try {
    const result = await findAll('user', {}, {}, { sortField: 'age', sortOrder: 'asc' });
    sendApiResponse(res, 200, true, 'Users fetched successfully', result);
  } catch (error) {
    console.log(error)
  }
};

/**
 * JWT GENERATE TOKEN WHEN SIGN IN USER
 * -------------------------------------
 * When user will sign in, then jwt token will be generated.
 * You can use this jwt token in Authorization.
 * */

const signInUser = async (req: Request, res: Response, next: NextFunction) => {
  const email = req.body.email;
  // const password = req.body.password;

  // const user = email

  /**
   * You can check the user email and password Here ;
   * If successfully login user, then sign token will be generated else Unauthorized user,Invalid Login
   * */

  // Check if the email exists in the database
  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Sign in jwt token
  const accessTokenSecret = config.jwt_secret_token;
  const accessExpire = config.jwt_expire_time;

  const token = jwt.sign({ user }, `${accessTokenSecret}`, {
    expiresIn: `${accessExpire}`,
  });

  res.status(200).json({
    success: true,
    user: user,
    token: token,
  });
};




// These are accessible from different files.
export const userController = {
  createUser,
  getUsers,
  signInUser,
};
