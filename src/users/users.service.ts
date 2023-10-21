import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { ServerException } from 'src/exceptions/server.exception';
import { ErrorCode } from 'src/exceptions/error-codes';
import { HashService } from 'src/hash/hash.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private hashService: HashService,
  ) {}

  async create(user: CreateUserDto) {
    const existUser = await this.userRepository.findOne({
      where: { email: user.email },
    });

    if (existUser) {
      throw new ServerException(ErrorCode.UserAlreadyExists);
    }

    const hashedPassword = await this.hashService.hashPassword(user.password);
    user.password = hashedPassword;

    return await this.userRepository.save(user);
  }

  async findId(id: number, relations = true) {
    const findOptions = {
      where: { id },
      ...(relations ? { relations: ['wishes'] } : {}),
    };

    const user = await this.userRepository.findOne(findOptions);

    if (!user) {
      throw new ServerException(ErrorCode.UserNotFound);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const updateUser = await this.userRepository.update(id, updateUserDto);

    if (!updateUser) {
      throw new ServerException(ErrorCode.UpdateError);
    }
    return await this.findId(id);
  }

  async getMyWishes(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: {
        wishes: { owner: true, offers: true },
      },
    });

    if (!user) {
      throw new ServerException(ErrorCode.UserNotFound);
    }

    return user.wishes;
  }

  async findUserName(name: string) {
    const user = await this.findUser(name);

    if (!user) {
      throw new ServerException(ErrorCode.UserNotFound);
    }

    return user;
  }

  async findUserNameWishes(name: string) {
    const { wishes } = await this.userRepository.findOne({
      where: { username: name },
      relations: ['wishes', 'wishes.offers', 'wishes.offers.user'],
    });

    if (!wishes) {
      throw new ServerException(ErrorCode.UserNotFound);
    }

    return wishes;
  }

  async findUser(query: string) {
    const existUser = await this.userRepository.findOne({
      where: [{ email: query }, { username: query }],
    });

    if (!existUser) {
      throw new ServerException(ErrorCode.UserNotFound);
    }

    return existUser;
  }
}
