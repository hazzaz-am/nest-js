import { IsString, ValidateNested } from 'class-validator';
import { TagDto } from './tag.dto';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  title: string;

  @ValidateNested()
  @Type(() => TagDto)
  tags: TagDto[];
}
