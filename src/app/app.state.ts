import { ProductsState } from './products/products/store/products.reducer';
import { ProductState } from './products/product/store/product.reducer';

export interface AppState {
  products: ProductsState;
  product: ProductState
}
