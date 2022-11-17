import { createReducer, on } from '@ngrx/store';
import * as productActions from './product.actions';
import { FetchStatus } from './../../../shared/enums/status.enum';
import { Product } from "../../models/product.model";


export interface ProductState {
  id: number | null;
  item: Product | null;
  status: FetchStatus.Pending | FetchStatus.InProgress | FetchStatus.Completed;
  error: string;
}

//The reducer is the one in charge of changing the state to a new one according to the action triggered
export const initialState: ProductState = {
  id: null,
  item: null,
  status: FetchStatus.Pending,
  error: ''
}

export const productReducer = createReducer(initialState,

  //When fetchProductById is dispatched the status is changed to In progress and let the effect know that the products service needs to be called
  on(productActions.fetchProductById, (state, { id }) => {
    return {
      ...state,
      id: id,
      status: FetchStatus.InProgress
    }
  }),

  //After a successfull call we receive a single product and passed to the state and the status is changed to completed
  on(productActions.fetchProductByIdSuccess, (state, { item }) => {
    return {
      ...state,
      item: {...item},
      status: FetchStatus.Completed
    }
  }),

  //In case of error the status is also set to completed and we pass the error message recieved as payload
  on(productActions.fetchProductByIdError, (state, { payload }) => {
    return {
      ...state,
      status: FetchStatus.Completed,
      error: payload.error
    }
  })

);
