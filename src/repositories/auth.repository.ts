import { User } from '../models/user.model.js';
import ValidationError from '../error/validationError.js';
import hashPassword from '../utils/hashPassword.js';

class AuthRepository {
  async register({
    name,
    password,
    email,
    username,
  }: {
    name: string;
    password: string;
    email: string;
    username: string;
  }) {
    const isExistingUser = await User.findOne({
      $or: [{ email }, { username }],
    });
    if (isExistingUser) {
      throw new ValidationError('User already exists');
    }
    const newUser = new User({
      name,
      password,
      email,
      username,
    });
    await newUser.save();
    return newUser;
  }

  async login({ email, password }: { email: string; password: string }) {
    const user = await User.findOne({ email });

    if (!user) {
      throw new ValidationError('Invalid email or password');
    }
    const isPassCorrect = await hashPassword.compareHash(
      password,
      user.password,
    );
    if (!isPassCorrect) {
      throw new ValidationError('Invalid email or password');
    }
    return user;
  }
}

export default AuthRepository;
