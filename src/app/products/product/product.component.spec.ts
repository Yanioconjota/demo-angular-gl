import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductComponent } from './product.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Product } from '../models/product.model';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let store: MockStore;

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
      declarations: [ ProductComponent ],
      imports: [RouterTestingModule],
      providers: [provideMockStore({})],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    component.products = mockedItems;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //Is called but is not deleting...
  it('should dispatch delete', () => {
    //By chaining the spy with and.callThrough, the spy will still track all calls to it but in addition it will delegate to the actual implementation.??
    const storeSpy = spyOn(store, 'dispatch').and.callThrough();
    component.delete(1);
    fixture.detectChanges();
    expect(storeSpy).toHaveBeenCalledTimes(1);
  });

});
