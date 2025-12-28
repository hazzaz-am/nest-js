import { IsArray, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class LibraryDto {
  @IsString()
  name: string;

  @IsArray()
  books: Types.ObjectId[];
}
