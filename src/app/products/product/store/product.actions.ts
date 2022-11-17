import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/products/models/product.model';

//Triggered by the smart component to let ProductEffects know that the fetch product service must be called
export const fetchProductById = createAction('[Product Component] Fetch product by Id', props<{ id: number }>());

//Triggered by the ProductsEffects to pass the fetched products via props
export const fetchProductByIdSuccess = createAction('[Product Component] Fetch product by Id Success', props<{ item: Product }>());


//Also triggered by ProductsEffects and receives the error to be updated
export const fetchProductByIdError = createAction('[Product Component] Fetch product by Id error', props<{ payload: any }>());
