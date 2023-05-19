import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { UserRepository } from '../users/user.repository';
import { verifyPassword } from 'src/common/utils/password-utils';

@Injectable()
export class AuthService {
  constructor(
    private userRespository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async login(payload: LoginDto) {
    const user = await this.userRespository.findUser({
      companyEmail: payload.companyEmail,
    });
    if (!user) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.BAD_REQUEST,
      );
    }
    const validPassword = await verifyPassword(payload.password, user.password);
    if (!validPassword) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.BAD_REQUEST,
      );
    }
    const userParams = {
      companyEmail: user.companyEmail,
      companyName: user.companyName,
      sub: user._id,
    };
    return {
      success: true,
      access_token: await this.jwtService.signAsync(userParams),
    };
  }
}
