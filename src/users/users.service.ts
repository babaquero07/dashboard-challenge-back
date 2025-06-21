import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
      },
    });

    return user;
  }

  async findById(id: number): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { id },
      select: {
        id: true,
        email: true,
      },
    });

    return user;
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const { email, password } = createUserDto;

      const userExists = await this.findByEmail(email);
      if (userExists) {
        throw new BadRequestException('El email ya está en uso');
      }

      const user = this.userRepository.create({
        email,
        password: bcryptjs.hashSync(password, 10),
      });

      await this.userRepository.save(user);
      const { password: _, dashboards: __, ...userWithoutPassword } = user;

      return userWithoutPassword;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    try {
      const user = await this.findById(id);
      if (!user) {
        throw new NotFoundException('El usuario no existe');
      }

      await this.userRepository.delete(id);

      return {
        message: 'Usuario eliminado correctamente',
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
