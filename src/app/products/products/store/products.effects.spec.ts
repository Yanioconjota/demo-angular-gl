import { TestBed } from "@angular/core/testing";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Observable, of } from "rxjs";
import { AppState } from "src/app/app.state";
import { ProductsService } from "../../services/products.service";
import { ProductsEffects } from "./products.effects";
import * as productsActions from './products.actions';
import { Product } from "../../models/product.model";
import { FetchStatus } from "src/app/shared/enums/status.enum";
import { mockedItems, MockService } from "../mocks/products.service.mock";

const initialState = {
   items: [],
   status: FetchStatus.Pending,
   error: undefined,
}

describe('ProductsEffects testing', () => {

  let actions$: Observable<any>;
  let effects: ProductsEffects;
  let store: MockStore<AppState>;
  let productsService: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductsEffects,
        provideMockActions(() => actions$),
        provideMockStore({ initialState }),
        { provide: ProductsService, useValue: MockService }
      ],
    });

    effects = TestBed.inject(ProductsEffects);
    store = TestBed.inject(MockStore);
    productsService = TestBed.inject(ProductsService);
  });

  it('effect should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should return a list of products', (done) => {
    const spy = MockService.getProducts.and.returnValue(of(mockedItems));
    actions$ = of(productsActions.fetchProducts());
    effects.getProducts$.subscribe((res) => {
      expect(res).toEqual(productsActions.fetchProductsSuccess({ items: mockedItems }));
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('should delete a product', (done) => {
    const id = 1;
    const filteredItems = mockedItems.filter(p => p.id !== id);
    const spy = MockService.deleteProduct.withArgs(1).and.returnValue(of(filteredItems));
    actions$ = of(productsActions.deleteProduct({id}));
    effects.deleteProduct$.subscribe((res) => {
      expect(res).toEqual(productsActions.fetchProductsSuccess({ items: filteredItems as unknown as Product[] }));
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });



});
