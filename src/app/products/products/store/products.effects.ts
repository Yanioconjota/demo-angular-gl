import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ProductsService } from 'src/app/products/services/products.service';
import { Product } from 'src/app/products/models/product.model';
import * as productsActions from './products.actions';


@Injectable()
export class ProductsEffects {
  constructor(private actions$: Actions,
              private productsService: ProductsService) {}

  getProducts$ = createEffect(
    () => this.actions$.pipe(
      ofType(productsActions.fetchProducts),
      mergeMap(() =>
        this.productsService.getProducts().pipe(
          tap( data => console.log('getProducts effect: ', data)),
          map((products: Product[]) => productsActions.fetchProductsSuccess({ items: products })),
          catchError( err => of(productsActions.fetchProductsError({ payload: err })))
        )
      )
    )
  );

  deleteProduct$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(productsActions.deleteProduct),
        mergeMap((action) => this.productsService.deleteProduct(action.id)
          .pipe(
            tap( data => console.log('getProducts effect: ', data)),
            map((products: Product[]) => productsActions.fetchProductsSuccess({ items: products })),
          catchError( err => of(productsActions.fetchProductsError({ payload: err })))
          )
    ));
  });


}
