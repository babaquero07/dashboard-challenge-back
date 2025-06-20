import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super();
  }

  async validate(payload: { id: number; email: string }) {
    console.log('inside local strategy');
    const user = await this.usersService.findByEmail(payload.email);
    if (!user) throw new UnauthorizedException('invalid token');

    return {
      id: user.id,
      email: user.email,
    };
  }
}
