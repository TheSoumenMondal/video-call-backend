import bcrypt from 'bcryptjs';

const hashPassword = {
  generateHashPass: async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  },
  compareHash: async (password: string, hash: string) => {
    return await bcrypt.compare(password, hash);
  },
};

export default hashPassword;
