import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async createEmployee(data: Partial<Employee>): Promise<Employee> {
    const newEmployee = this.employeeRepository.create(data);
    return this.employeeRepository.save(newEmployee);
  }

  async getAllEmployees() {
    return this.employeeRepository.find();
  }

  async updateEmployee(id: number, data: Partial<Employee>): Promise<Employee> {
    const employee = await this.employeeRepository.findOneBy({ id });
    if (!employee) {
      throw new NotFoundException(`Employee not found in this id: ${id}`);
    }
    const updatedEmployee = Object.assign(employee, data);
    return this.employeeRepository.save(updatedEmployee);
  }

  async deleteEmployee(id: number) {
    return this.employeeRepository.delete({ id });
  }
}
