import { Injectable } from '@nestjs/common';
import { FindUserDto } from './dto/find-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FindOneOptions, Repository } from 'typeorm';
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

    if (existUser) throw new ServerException(ErrorCode.UserAlreadyExists);

    const hashedPassword = await this.hashService.hashPassword(user.password);
    user.password = hashedPassword;

    return await this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  // async findOne(query) {
  //   const existUser = await this.userRepository.findOne({
  //     where: [{ email: query }, { username: query }],
  //   });
  //   return existUser;
  // }

  // async findId(id: number) {
  //   const existUser = await this.userRepository.findOne({
  //     where: { id: id },
  //     relations: { wishes: true },
  //   });
  //   return existUser;
  // }

  async findId(id: number, relations = true) {
    const findOptions: FindOneOptions<User> = {
      where: { id: id },
    };

    if (relations) {
      findOptions.relations = ['wishes'];
    }

    const existUser = await this.userRepository.findOne(findOptions);
    return existUser;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(id, updateUserDto);
    return this.findId(id);
  }

  async getMyWishes(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: {
        wishes: { owner: true, offers: true },
      },
    });
    return user.wishes;
  }

  async findUserName(name: string) {
    const user = await this.findUser(name);
    return user;
  }

  async findUserNameWishes(name: string) {
    const userWishes = await this.userRepository.findOne({
      where: { username: name },
      relations: {
        offers: { user: true, item: true },
      },
    });
    return userWishes.offers;
  }

  async findUser(query: string) {
    const existUser = await this.userRepository.findOne({
      where: [{ email: query }, { username: query }],
    });
    return existUser;
  }
}
