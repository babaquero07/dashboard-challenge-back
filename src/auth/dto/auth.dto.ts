import { IsEmail, IsString } from 'class-validator';

export class AuthDto {
  @IsEmail({}, { message: 'El email no es válido' })
  email: string;

  @IsString()
  password: string;
}
