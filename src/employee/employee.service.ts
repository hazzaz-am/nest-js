import { Injectable, NotFoundException } from '@nestjs/common';
import { IEmployee } from './interface/employee.interface';
import { EmployeeDTO } from './dto/employee.dto';

@Injectable()
export class EmployeeService {
  private employees: IEmployee[] = [
    { id: 1, name: 'Hazzaz', age: 24 },
    { id: 2, name: 'Abdul', age: 25 },
    { id: 3, name: 'Mannan', age: 30 },
    { id: 4, name: 'Shanto', age: 24 },
    { id: 5, name: 'Rasel', age: 24 },
  ];

  // GET: all employees
  getAllEmployees(): IEmployee[] {
    return this.employees;
  }

  // GET: find Employee by id
  getEmployeeById(id: number): IEmployee {
    const employee = this.employees.find((employee) => employee.id === id);
    if (!employee) throw new NotFoundException();
    return employee;
  }

  // POST: create new Employee
  createNewEmployee(data: EmployeeDTO) {
    const newEmployee: IEmployee = {
      id: Date.now(),
      ...data,
    };
    this.employees.push(newEmployee);
    return newEmployee;
  }

  // PUT: update full employee details
  updateEmployee(id: number, data: EmployeeDTO): IEmployee {
    const index = this.employees.findIndex((employee) => employee.id === id);
    if (index === -1) throw new NotFoundException('Employee data not found');
    this.employees[index] = {
      id,
      ...data,
    };
    return this.employees[index];
  }

  // PATCH: modified employee details
  modifyEmployeeData(id: number, data: Partial<EmployeeDTO>): IEmployee {
    const employee = this.getEmployeeById(id);
    Object.assign(employee, data);
    return employee;
  }

  // DELETE: delete employee data
  deleteEmployeeById(id: number) {
    const index = this.employees.findIndex((employee) => employee.id === id);
    if (index === -1) throw new NotFoundException('Employee data not found');
    const employee = this.employees.splice(index, 1);
    return {
      message: 'Employee data deleted successfully',
      deletedEmployee: employee[0],
    };
  }
}
