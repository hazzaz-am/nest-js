import {
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service.js';
import { UserService } from '../user/user.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async registerUser(registerDto: RegisterDto) {
    const hashPassword = await bcrypt.hash(registerDto.password, 10);

    return this.prismaService.$transaction(async (tx) => {
      const user = await this.userService.createUser(
        {
          ...registerDto,
          password: hashPassword,
        },
        tx,
      );

      const payload = { sub: user.id, email: user.email };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    });
  }

  async loginUser(loginDto: LoginDto) {
    const user = await this.userService.getUserByEmail(loginDto.email);

    const isPasswordValid = user
      ? await bcrypt.compare(loginDto.password, user.password)
      : false;

    if (!user || !isPasswordValid) {
      this.logger.warn(`Failed login attempt for ${loginDto.email}`);
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
