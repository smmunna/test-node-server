import { Schema, model } from 'mongoose';
import User from './user.interface';

const userSchema = new Schema<User>({
    username: { type: String, required: true },
    email: { type: String },
    password: { type: String },
    role: { type: String }
})

const userModel = model<User>('user', userSchema)

export default userModel;