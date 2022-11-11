import { FetchStatus } from './../../shared/enums/status.enum';
import { createReducer, on } from '@ngrx/store';
import { fetchProducts } from './products.actions';
import { Product } from 'src/app/products/models/product.model';

export interface ProductsState {
    items: Product[];
    status: FetchStatus.Pending | FetchStatus.InProgress | FetchStatus.Completed;
    error: string;
}

export const initialState: ProductsState = {
   items: [],
   status: FetchStatus.Pending,
   error: '',
}

export const productsReducer = createReducer(initialState,

    on(fetchProducts, state => {
      return {
        ...state,
        status: FetchStatus.InProgress
      }
    }),

);
