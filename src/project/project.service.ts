import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project, TProjectDocument } from './schemas/project.schema';
import { Model } from 'mongoose';
import { Developer, TDeveloperDocument } from './schemas/developer.schema';
import { ProjectDto } from './dto/project.dto';
import { DeveloperDto } from './dto/developer.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<TProjectDocument>,
    @InjectModel(Developer.name)
    private developerModel: Model<TDeveloperDocument>,
  ) {}

  async createProject(data: ProjectDto): Promise<TProjectDocument> {
    const newProject = new this.projectModel(data);
    return newProject.save();
  }

  async assignDeveloper(data: DeveloperDto): Promise<TDeveloperDocument> {
    const newDeveloper = new this.developerModel(data);
    return newDeveloper.save();
  }

  async getAllProjects(): Promise<TProjectDocument[]> {
    return this.projectModel.find().populate('developers');
  }

  async getAllDevelopers(): Promise<TDeveloperDocument[]> {
    return this.developerModel.find().populate('projects');
  }
}
