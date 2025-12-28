import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type TProjectDocument = HydratedDocument<Project>;

@Schema({ timestamps: true, versionKey: false })
export class Project {
  @Prop({ required: true })
  title: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Developer' }] })
  developers?: Types.ObjectId[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
