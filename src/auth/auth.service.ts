import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    @InjectRepository(User)
    private usuariosRepository: Repository<User>,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<any> {
    const hashedPassword = await bcrypt.hash(this.configService.get<string>('ENCRYPTION_KEY') + createUserDto.password, 10);
    const newUser = this.usuariosRepository.create({  
      ...createUserDto,
      password: hashedPassword,
      last_access: new Date()
    });
    return this.usuariosRepository.save(newUser);
  }
}
