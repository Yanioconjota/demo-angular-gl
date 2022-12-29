import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsComponent } from './products.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { FetchStatus } from '../../shared/enums/status.enum';
import { getFetchProductsStatus, getProducts } from './store/products.selectors';
import { ProductComponent } from '../product/product.component';
import { Product } from '../models/product.model';
import { ProductState } from '../product/store/product.reducer';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let store: MockStore<ProductState>;

  const initialState = {
    items: [],
    status: FetchStatus.Pending,
    error: ''
  };

  const mockedItems = [
    { id: 1, name: 'Toaster', description: 'A regular toaster', img: '../../assets/img/toaster.png' },
    { id: 2, name: 'TV', description: 'A big ass TV', img: '../../assets/img/tv.png' },
    { id: 3, name: 'Electric guitar', description: 'A device used to impress people or annoy neighbours', img: '../../assets/img/electric-guitar.png' },
    { id: 4, name: 'PS5', description: "If you have the money we won't have it" },
    { id: 5, name: 'Crappy office notebook', description: 'Expensive as f*ck, cant run sh*t in it' },
    { id: 6, name: 'Gaming mouse', description: "It won't improve your aim", img: '../../assets/img/gaming-mouse.png' },
    { id: 7, name: 'Gaming keyboard', description: 'Because it has the word gaming in it' },
    { id: 8, name: 'Gaming waifu', description: 'Instructions not included', img: '../../assets/img/gaming-waifu.png' },
  ] as Product[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsComponent, ProductComponent ],
      imports: [RouterTestingModule],
      providers: [
        provideMockStore({
          initialState,
          selectors: [
            {
              selector: getFetchProductsStatus, value: FetchStatus.Completed
            },
            {
              selector: getProducts, value: mockedItems
            }
          ]
        })
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch fetchProducts', () => {
    const storeSpy = spyOn(store, 'dispatch').and.callThrough();
    component.ngOnInit();
    fixture.detectChanges();
    expect(storeSpy).toHaveBeenCalledTimes(1);
    expect(component.products.length).toBe(8);
  });

});
