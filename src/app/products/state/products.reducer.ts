import { createReducer, on } from '@ngrx/store';
import { fetchProducts } from './products.actions';
import { Product } from 'src/app/products/models/product.model';

export interface ProductsState {
    items: Product[];
    status: string;
    error: string;
}

export const initialState: ProductsState = {
   items: [],
   status: 'PENDING',
   error: '',
}

export const productsReducer = createReducer(initialState,

    on(fetchProducts, state => {
      return {
        ...state,
        status: 'IN_PROGRESS'
      }
    }),

);
