import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/products/models/product.model';

//Triggered by the smart component to let ProductsEffects know that the getch product service must be called
export const fetchProducts = createAction('[Products Component] Fetch products');

//Triggered by the ProductsEffects to pass the fetched products via props
export const fetchProductsSuccess = createAction('[Products Component] Fetch products Success', props<{ items: Product[] }>());

//Also triggered by ProductsEffects and receives the error to be updated
export const fetchProductsError = createAction('[Products Component] Fetch products error', props<{ payload: string }>());

export const deleteProduct = createAction('[Products Component] Delete product', props<{ id: number }>());
