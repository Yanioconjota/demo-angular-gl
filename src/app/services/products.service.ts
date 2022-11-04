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
    { id: 4, name: 'PS5', description: "If you have the money we won't have it" },
    { id: 5, name: 'Crappy office notebook', description: 'Expensive as f*ck, cant run sh*t in it' },
    { id: 6, name: 'Gaming mouse', description: "It won't improve your aim" },
    { id: 7, name: 'Gaming keyboard', description: 'Because it has the word gaming in it' },
    { id: 8, name: 'Gaming waifu', description: 'Instructions not included' },
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
