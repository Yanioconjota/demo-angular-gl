import { createSelector } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { ProductState } from './product.reducer';

export const selectProduct = (state: AppState) => state.product;

export const getFetchProductStatus = createSelector(
  selectProduct,
  (state: ProductState) => state.status
);

export const getFetchProduct = createSelector(
  selectProduct,
  (state: ProductState) => state.item
);
