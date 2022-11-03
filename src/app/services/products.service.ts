import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products: Product[] = [
    { id: 1, name: 'Toaster', description: 'A regular toaster' },
    { id: 2, name: 'TV', description: 'A big ass TV' },
    { id: 3, name: 'Electric guitar', description: 'A device used to impress people or annoy neighbours' },
    { id: 5, name: 'PS5', description: "If you have the money we won't have it" },
    { id: 6, name: 'Toaster', description: 'A regular toaster' },
  ]

  constructor() { }

  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: number): Product {
    return this.products[id];
  }

  deleteProduct(id: number): Product[] {
    return this.products.filter(p => p.id !== id);
  }
}
