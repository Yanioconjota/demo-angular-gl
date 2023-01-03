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

const initialState = {
   items: [],
   status: FetchStatus.Pending,
   error: undefined,
}

let mockedItems = [
  { id: 1, name: 'Toaster', description: 'A regular toaster', img: '../../assets/img/toaster.png' },
  { id: 2, name: 'TV', description: 'A big ass TV', img: '../../assets/img/tv.png' },
  { id: 3, name: 'Electric guitar', description: 'A device used to impress people or annoy neighbours', img: '../../assets/img/electric-guitar.png' },
  { id: 4, name: 'PS5', description: "If you have the money we won't have it" },
  { id: 5, name: 'Crappy office notebook', description: 'Expensive as f*ck, cant run sh*t in it' },
  { id: 6, name: 'Gaming mouse', description: "It won't improve your aim", img: '../../assets/img/gaming-mouse.png' },
  { id: 7, name: 'Gaming keyboard', description: 'Because it has the word gaming in it' },
  { id: 8, name: 'Gaming waifu', description: 'Instructions not included', img: '../../assets/img/gaming-waifu.png' },
] as Product[];

class MockService {
  getProducts() {
    return of(mockedItems);
  }

  deleteProduct(id: number) {
    mockedItems = mockedItems.filter(p => p.id !== id);
    return of(mockedItems);
  }
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
        { provide: ProductsService, useClass: MockService }
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
    const spy = spyOn(productsService, 'getProducts').and.callThrough();
    actions$ = of(productsActions.fetchProducts());
    effects.getProducts$.subscribe((res) => {
      expect(res).toEqual(productsActions.fetchProductsSuccess({ items: mockedItems }));
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('should delete a product', (done) => {
    const id = 1;
    const spy = spyOn(productsService, 'deleteProduct').withArgs(1).and.callThrough();
    const expected = mockedItems.filter(p => p.id !== id);
    actions$ = of(productsActions.deleteProduct({id}));
    effects.deleteProduct$.subscribe((res) => {
      expect(res).toEqual(productsActions.fetchProductsSuccess({ items: expected as unknown as Product[] }));
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

});
