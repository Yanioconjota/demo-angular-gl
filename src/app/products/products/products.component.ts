import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { debounceTime } from "rxjs/operators";
import { Product } from 'src/app/products/models/product.model';
import { ProductsService } from 'src/app/products/services/products.service';
import { Store } from '@ngrx/store';
import { getFetchProductsStatus } from '../state/products.selectors';
import { Observable } from 'rxjs';
import { fetchProducts } from '../state/products.actions';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  subscriber!: Subscription;
  //products!: Product[];
  status$: Observable<string> = this.store.select(getFetchProductsStatus);


  constructor(private store: Store<any>) {
    console.log('constructor');
  }

  ngOnInit(): void {
    console.log('on init');
    this.status$.subscribe()
    this.store.dispatch(fetchProducts());
  }

  ngOnDestroy(): void {

  }


}
