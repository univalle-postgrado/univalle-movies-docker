import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
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

  async register (createUserDto: CreateUserDto): Promise<any> {
    // verificamos si existe un usuario con el mismo login o email
    const existingUser = await this.usersRepository.exists({
      where: [
        { login: createUserDto.login },
        { email: createUserDto.email },
      ],
    })
    if (existingUser) {
      throw new UnprocessableEntityException('Ya existe un usuario con el mismo login o contraseña. Por favor, intente con otro.');
    }

    const hashedPassword = await bcrypt.hash(this.configService.get<string>('ENCRYPTION_KEY') + createUserDto.password, 10);
    const newUser = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
      enabled: true
    });
    return this.usersRepository.save(newUser);
  }

  async createToken (loginDto: LoginDto): Promise<any> {
    const user = await this.usersRepository.findOne({
      select: {
        id: true,
        login: true,
        role: true,
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
          sub: user.id,
          login: user.login,
          fullname: user.fullname,
          email: user.email,
          role: user.role,
        }
        return {
          'access_token': this.jwtService.sign(payload, {
            expiresIn: this.configService.get('JWT_EXPIRES_IN'),
          })
        };
      }
    }

    throw new UnauthorizedException('El login o contraseña no son válidos');
  }

  verifyToken(token: string): any {
    try {
      return this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token ha expirado');
      } else if (error.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Token inválido');
      } else {
        throw new UnauthorizedException('La validación del token ha fallado');
      }
    }
  }
}
