import { Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { ServerException } from 'src/exceptions/server.exception';
import { ErrorCode } from 'src/exceptions/error-codes';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async signup(user: SignUpDto) {
    const existUser = await this.userRepository.findOne({
      where: { email: user.email },
    });

    if (existUser) throw new ServerException(ErrorCode.UserAlreadyExists);

    return await this.userRepository.save(user);
  }

  async signin(user: SignInDto) {
    const checkUser = await this.userRepository.find({
      where: {
        username: user.username,
        password: user.password,
      },
    });

    return checkUser;
    // if (checkUser) return this.userRepository.
  }
}
