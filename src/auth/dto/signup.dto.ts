import { IsOptional, IsString } from 'class-validator';

export class SignUpDto {
  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  username: string;

  @IsString()
  @IsOptional()
  about?: string;

  @IsString()
  @IsOptional()
  avatar?: string;
}
