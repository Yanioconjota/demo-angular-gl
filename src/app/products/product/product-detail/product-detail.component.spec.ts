import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { FetchStatus } from 'src/app/shared/enums/status.enum';
import { getFetchProduct, getFetchProductStatus } from '../store/product.selectors';
import { ProductDetailComponent } from './product-detail.component';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;

  const mockedSnapshot = { snapshot: { url: [{ path: 1 }] } };
  const mockedItem = { id: 1, name: 'Toaster', description: 'A regular toaster', img: '../../assets/img/toaster.png' };

  beforeEach(waitForAsync (() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDetailComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: mockedSnapshot
        },
        provideMockStore({
          selectors: [
            { selector: getFetchProduct, value: mockedItem },
            { selector: getFetchProductStatus, value: FetchStatus.Completed }
          ]
        }),
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
