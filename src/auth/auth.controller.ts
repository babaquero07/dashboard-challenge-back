import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
// import { LocalGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK) // 200 code
  @Post('login')
  // @UseGuards(LocalGuard)
  login(@Body() authPayload: AuthDto) {
    return this.authService.login(authPayload);
  }
}
