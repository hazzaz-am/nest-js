import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from './employee.entity';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  async createEmployee(@Body() body: Partial<Employee>) {
    return this.employeeService.createEmployee(body);
  }

  @Get()
  async getAllEmployee() {
    return this.employeeService.getAllEmployees();
  }

  @Put(':id')
  async updateEmployeeById(
    @Param('id') id: string,
    @Body() body: Partial<Employee>,
  ) {
    return this.employeeService.updateEmployee(Number(id), body);
  }

  @Delete(':id')
  async deleteEmployee(@Param('id') id: string) {
    return this.employeeService.deleteEmployee(Number(id));
  }
}
