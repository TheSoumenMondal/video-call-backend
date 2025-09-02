import { User } from '../models/user.model.js';

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
      throw new Error('User already exists');
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
}

export default AuthRepository;
