import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Product } from '../models/product.model';
import { ProductsState } from './products.reducer';

export const selectProducts = (state: AppState) => state.products;

export const getFetchProductsStatus = createSelector(
  selectProducts,
  (state: ProductsState) => state.status
);

export const getProducts = createSelector(
  selectProducts,
  (state: ProductsState) => state.items
);
