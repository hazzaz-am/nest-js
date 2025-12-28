import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type TDeveloperDocument = HydratedDocument<Developer>;

@Schema({ timestamps: true, versionKey: false })
export class Developer {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Project' }] })
  projects?: Types.ObjectId[];
}

export const DeveloperSchema = SchemaFactory.createForClass(Developer);
