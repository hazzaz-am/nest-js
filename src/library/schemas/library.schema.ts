import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type TLibraryDocument = HydratedDocument<Library>;

@Schema()
export class Library {
  @Prop()
  name: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Book' }] })
  books: Types.ObjectId[];
}

export const LibrarySchema = SchemaFactory.createForClass(Library);
