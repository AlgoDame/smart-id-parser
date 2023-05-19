import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { CreateUserDTO } from './dto/create-user.dto';
import { ResponseError } from 'src/common/interfaces/error.interface';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel('User')
    private readonly UserModel: Model<User>,
  ) {}

  async createUser(payload: CreateUserDTO): Promise<User> {
    const existingUser = await this.UserModel.findOne({
      companyEmail: payload.companyEmail,
    });
    if (existingUser) {
      const error: ResponseError = new Error(
        `User with ${payload.companyEmail} already exists.`,
      );
      error.statusCode = 400;
      throw error;
    }

    return this.UserModel.create({
      ...payload,
    });
  }

  async findUser(params: Record<string, any>) {
    return this.UserModel.findOne({ ...params }).exec();
  }
}
