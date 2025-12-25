import { IsInt, IsString } from 'class-validator';

export class EmployeeDTO {
  @IsString()
  name: string;
  @IsInt()
  age: number;
}
