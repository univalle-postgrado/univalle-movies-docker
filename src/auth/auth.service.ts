import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<any> {
    const hashedPassword = await bcrypt.hash(this.configService.get<string>('ENCRYPTION_KEY') + createUserDto.password, 10);
    const newUser = this.usersRepository.create({  
      ...createUserDto,
      password: hashedPassword,
      last_access: new Date()
    });
    return this.usersRepository.save(newUser);
  }

  async token(loginDto: LoginDto): Promise<any> {
    const user = await this.usersRepository.findOne({
      select: {
        id: true,
        login: true,
        password: true,
        fullname: true,
        email: true,
        phone: true
      },
      where: {
        login: loginDto.login
      }
    });
    if (user) {
      const isPasswordMatch = await bcrypt.compare(this.configService.get<string>('ENCRYPTION_KEY') + loginDto.password, user.password);
      if (isPasswordMatch) {
        const payload = {
          ...user,
          password: undefined,
        };

        return {
          'access_token': this.jwtService.sign(payload, {
            expiresIn: this.configService.get('JWT_EXPIRES_IN'),
          })
        }
      }
    }

    throw new UnauthorizedException(`El login o contraseña no son válidos`);
  }

  verifyToken(token: string): any {
    try {
      return this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Refresh token ha expirado');
      } else if (error.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Refresh token inválido');
      } else {
        throw new UnauthorizedException('La validación del Refresh token ha fallado');
      }
    }
  }
}
