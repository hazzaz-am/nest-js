import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Tag } from './tag.schema';

export type TProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop()
  title: string;

  @Prop({ type: [Tag] })
  tags: Tag[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
