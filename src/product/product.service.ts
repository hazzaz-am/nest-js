import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  private products = [
    {
      id: 1,
      item: 'IPhone',
    },
    {
      id: 2,
      item: 'IPad',
    },
    {
      id: 3,
      item: 'Macbook',
    },
    {
      id: 4,
      item: 'Mac Mini',
    },
  ];

  getAllProduct() {
    return this.products;
  }

  getProductById(id: number) {
    return this.products.find((product) => product.id === id);
  }
}
