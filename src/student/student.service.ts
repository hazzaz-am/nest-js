import { Injectable, NotFoundException } from '@nestjs/common';
import { Student } from './student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  //* CREATE STUDENT
  async createStudent(data: Partial<Student>): Promise<Student> {
    const newStudent = this.studentRepository.create(data);
    return this.studentRepository.save(newStudent);
  }

  //* GET ALL STUDENT
  async getAllStudents(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  //* GET STUDENT BY ID
  async getStudentById(id: number): Promise<Student> {
    const student = await this.studentRepository.findOneBy({ id });

    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }

    return student;
  }

  //* UPDATE STUDENT BY ID
  async updateStudentById(
    id: number,
    data: Partial<Student>,
  ): Promise<Student> {
    const student = await this.getStudentById(id);
    const updatedStudent = Object.assign(student, data);
    return this.studentRepository.save(updatedStudent);
  }

  //* DELETE STUDENT BY ID
  async deleteStudentById(id: number): Promise<{ message: string }> {
    const student = await this.getStudentById(id);
    const res = await this.studentRepository.delete(student.id);

    if (res.affected === 0) {
      throw new NotFoundException('Student Delete Failed');
    }

    return { message: 'Student deleted successfully' };
  }
}
