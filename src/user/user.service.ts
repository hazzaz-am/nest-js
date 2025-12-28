import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TUserDocument, User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<TUserDocument>,
  ) {}

  async createUser(data: CreateUserDto): Promise<TUserDocument> {
    const newUser = new this.userModel(data);
    return await newUser.save();
  }
}
