import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { ServerException } from 'src/exceptions/server.exception';
import { ErrorCode } from 'src/exceptions/error-codes';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { HashService } from 'src/hash/hash.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
    private hashService: HashService,
  ) {}

  async signin(user: User) {
    const payload = { sub: user.id };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async validation(username: string, password: string) {
    const checkUser = await this.userRepository.findOne({
      where: {
        username: username,
      },
    });

    if (!checkUser) {
      throw new ServerException(ErrorCode.LoginOrPasswordIncorrect);
    }

    const isPasswordMatching = await this.hashService.comparePasswords(
      password,
      checkUser.password,
    );

    if (!isPasswordMatching) {
      throw new ServerException(ErrorCode.LoginOrPasswordIncorrect);
    } else {
      const { password, ...result } = checkUser;
      return result;
    }
  }
}
