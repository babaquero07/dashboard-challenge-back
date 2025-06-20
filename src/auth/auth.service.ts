import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UsersService } from 'src/users/users.service';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    // Services
    private jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  generateJwtToken(payload: { id: number; email: string }) {
    return this.jwtService.sign(payload);
  }

  async login(authPayload: AuthDto) {
    const { email, password } = authPayload;

    const user = await this.usersService.findByEmail(email);
    if (!user || !bcryptjs.compareSync(password, user.password)) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const payload = {
      id: user.id,
      email: user.email,
    };

    const token = this.generateJwtToken(payload);

    return {
      user: {
        id: user.id,
        email: user.email,
      },
      token,
    };
  }
}
