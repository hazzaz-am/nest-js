import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { Student } from './student.entity';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  async createStudent(@Body() data: Partial<Student>): Promise<Student> {
    return this.studentService.createStudent(data);
  }

  @Get()
  async getAllStudents(): Promise<Student[]> {
    return this.studentService.getAllStudents();
  }

  @Get(':id')
  async getStudentById(@Param('id') id: number): Promise<Student> {
    return this.studentService.getStudentById(id);
  }

  @Put(':id')
  async updateStudentById(
    @Param('id') id: number,
    @Body() data: Partial<Student>,
  ): Promise<Student> {
    return this.studentService.updateStudentById(id, data);
  }

  @Delete(':id')
  async deleteStudentById(
    @Param('id') id: number,
  ): Promise<{ message: string }> {
    return this.studentService.deleteStudentById(id);
  }
}
