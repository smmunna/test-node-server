import { Schema, model } from 'mongoose';
import User from './user.interface';
import bcrypt from 'bcrypt';

// Creating Schema
const userSchema = new Schema<User>({
  username: { type: String, required: true },
  email: { type: String },
  password: { type: String, required: true },
  role: { type: String },
});

// Pre-save hook to hash the password
userSchema.pre('save', function (next) {
  const user = this as any;

  // Hash the password only if it's new or modified
  if (!user.isModified('password')) return next();

  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

// Creating a Model
const userModel = model<User>('user', userSchema);

export default userModel;

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
