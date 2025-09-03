import ValidationError from '../error/validationError.js';
import AuthRepository from '../repositories/auth.repository.js';

class AuthService {
  private authRepository: AuthRepository;
  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }
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
    return this.authRepository.register({
      name,
      password,
      email,
      username,
    });
  }

  async login({
    email,
    password,
    confirmPassword,
  }: {
    email: string;
    password: string;
    confirmPassword: string;
  }) {
    if (password !== confirmPassword) {
      throw new ValidationError('Passwords do not match');
    }

    const user = await this.authRepository.login({
      email,
      password,
    });

    return user;
  }
}

export default AuthService;
