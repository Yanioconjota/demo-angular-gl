import { ProductsState } from './products/products/store/products.reducer';
import { ProductState } from './products/product/store/product.reducer';
import { AuthState } from './auth/models/auth.model';

export interface AppState {
  products: ProductsState;
  product: ProductState;
  auth: AuthState
}
