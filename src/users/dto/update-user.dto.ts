import { IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  username: string;

  @IsString()
  about: string;

  @IsString()
  avatar: string;
}
