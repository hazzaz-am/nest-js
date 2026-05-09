import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) { }

  async register(registerDto: RegisterDto) {
    const { email, password } = registerDto;

    const existingUser = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException(
        'User already exists. Please try logging in or use a different email address.',
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newlyCreatedUser = await this.prismaService.user.create({
      data: {
        email,
        password: hashedPassword,
      }
    });

    const { password: _, ...userWithoutPassword } = newlyCreatedUser;

    return userWithoutPassword;
  }
}
