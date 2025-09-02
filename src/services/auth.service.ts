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
}

export default AuthService;
