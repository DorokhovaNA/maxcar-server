import { CreateUserDto } from './../auth/dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UsersDocument } from '../schemas/users.schema';
import { LoginUserDto } from '../auth/dto/login-user.dto';
import { hash } from '../utils/crypto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private usersModel: Model<UsersDocument>,
  ) {}

  async login(loginUserDto: LoginUserDto): Promise<User | null> {
    const user = await this.usersModel.collection.findOne({
      username: loginUserDto.username,
    });

    if (!user) {
      return null;
    }

    return user as User;
  }

  async registration(createUserDto: CreateUserDto): Promise<User | null> {
    const existingUser = await this.usersModel.collection.findOne({
      username: createUserDto.username,
    });

    if (existingUser) {
      return null;
    }

    const createdUser = new this.usersModel(createUserDto);
    createdUser.password = await hash(createUserDto.password);

    return createdUser.save();
  }

  async findOne(username: string): Promise<User> {
    return this.usersModel.findOne({ username });
  }
}
