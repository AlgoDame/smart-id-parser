import { Controller, Post, Body } from '@nestjs/common';
import { Request } from 'express';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('signup')
  signUp(@Body() payload: CreateUserDTO) {
    return this.userService.signUp(payload);
  }
}
