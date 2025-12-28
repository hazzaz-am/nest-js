import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, TProductDocument } from './schemas/product.schema';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<TProductDocument>,
  ) {}

  async createProduct(data: CreateProductDto): Promise<TProductDocument> {
    const newProduct = new this.productModel(data);
    return newProduct.save();
  }
}
