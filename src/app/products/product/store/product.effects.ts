import { Injectable } from '@angular/core';
import { Product } from 'src/app/products/models/product.model';
import { ProductsService } from '../../services/products.service';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as productActions from './product.actions';

@Injectable()

export class ProductEffect {
  constructor(private actions$: Actions,
              private productsService: ProductsService) {}

  getProductById$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(productActions.fetchProductById),
        mergeMap((action) => this.productsService.getProductById(action.id)
          .pipe(
            tap( data => console.log('getProducts effect: ', data)),
            map((product) => productActions.fetchProductByIdSuccess({item: product} as any)),
            catchError( err => of(productActions.fetchProductByIdError({ payload: err })))
          )
    ));
  });
}
