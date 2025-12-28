import { IsArray, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class ProjectDto {
  @IsString()
  title: string;

  @IsArray()
  developers?: Types.ObjectId[];
}
