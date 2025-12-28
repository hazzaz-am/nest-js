import { IsArray, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class DeveloperDto {
  @IsString()
  name: string;

  @IsArray()
  projects?: Types.ObjectId[];
}
