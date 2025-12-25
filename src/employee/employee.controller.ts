import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeDTO } from './dto/employee.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { RolesGuard } from 'src/guards/roles/roles.guard';
import { Roles } from 'src/guards/roles/roles.decorator';
import { ERoles } from 'src/guards/roles/roles.enum';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  @UseGuards(AuthGuard)
  getAllEmployees() {
    return this.employeeService.getAllEmployees();
  }

  @Get(':id')
  getEmployeeById(@Param('id') id: string) {
    return this.employeeService.getEmployeeById(Number(id));
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(ERoles.ADMIN)
  createNewEmployee(@Body() data: EmployeeDTO) {
    return this.employeeService.createNewEmployee(data);
  }

  @Put(':id')
  updateEmployeeData(@Param('id') id: string, @Body() data: EmployeeDTO) {
    return this.employeeService.updateEmployee(Number(id), data);
  }

  @Patch(':id')
  modifyEmployeeData(
    @Param('id') id: string,
    @Body() data: Partial<EmployeeDTO>,
  ) {
    return this.employeeService.modifyEmployeeData(Number(id), data);
  }

  @Delete(':id')
  deleteEmployeeById(@Param('id') id: string) {
    return this.employeeService.deleteEmployeeById(Number(id));
  }
}
