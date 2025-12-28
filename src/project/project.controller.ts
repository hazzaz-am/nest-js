import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectDto } from './dto/project.dto';
import { DeveloperDto } from './dto/developer.dto';

@Controller('project')
export class ProjectController {
  constructor(private readonly developerProjectService: ProjectService) {}

  @Post('/create-project')
  async createProject(@Body() data: ProjectDto) {
    return this.developerProjectService.createProject(data);
  }

  @Post('/create-developer')
  async assignDeveloper(@Body() data: DeveloperDto) {
    return this.developerProjectService.assignDeveloper(data);
  }

  @Get()
  async getAllProjects() {
    return this.developerProjectService.getAllProjects();
  }

  @Get('/developers')
  async getAllDevelopers() {
    return this.developerProjectService.getAllDevelopers();
  }
}
