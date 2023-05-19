import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDTO } from './dto/create-user.dto';
import { hashPassword } from '../common/utils/password-utils';
import _ from 'underscore';

@Injectable()
export class UsersService {
  constructor(private readonly userRespository: UserRepository) {}
  async signUp(payload: CreateUserDTO) {
    payload.password = await hashPassword(payload.password);
    const user = await this.userRespository.createUser(payload);
    return _.omit(user.toJSON(), 'password');
  }
}
