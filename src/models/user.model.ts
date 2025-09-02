import mongoose from 'mongoose';
import { IUser } from '../types/user.js';
import hashPassword from '../utils/hashPassword.js';

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String,
    },
    bio: {
      type: String,
      default: 'I am loving this platform.',
    },
  },
  { timestamps: true },
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await hashPassword.generateHashPass(this.password);
  next();
});

const User = mongoose.model<IUser>('User', userSchema);

export { User };
