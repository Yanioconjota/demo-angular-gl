import { FetchStatus } from 'src/app/shared/enums/status.enum';
import { createReducer, on } from '@ngrx/store';
import * as productsActions from './products.actions';
import { Product } from 'src/app/products/models/product.model';

export interface ProductsState {
    items: Product[];
    status: FetchStatus.Pending | FetchStatus.InProgress | FetchStatus.Completed;
    error: string | undefined;
}

export const initialState: ProductsState = {
   items: [],
   status: FetchStatus.Pending,
   error: undefined,
}

//The reducer is the one in charge of changing the state to a new one according to the action triggered
export const productsReducer = createReducer(initialState,

    //When fetchProducts is dispatched the status is changed to In progress and let the effect know that the products service needs to be called
    on(productsActions.fetchProducts, state => {
      return {
        ...state,
        status: FetchStatus.InProgress
      }
    }),

    //After a successfull call we receive a list of products and passed to the state and the status is changed to completed
    on(productsActions.fetchProductsSuccess, (state, { items }) => {
      return {
        ...state,
        status: FetchStatus.Completed,
        items: items
      }
    }),

    //In case of error the status is also set to completed and we pass the error message recieved as payload
    on(productsActions.fetchProductsError, (state, { payload }) => {
      return {
        ...state,
        status: FetchStatus.Completed,
        error: payload.err
      }
    }),



);
