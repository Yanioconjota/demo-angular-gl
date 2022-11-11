import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { getFetchProductsStatus } from '../state/products.selectors';
import { fetchProducts } from '../state/products.actions';
import { AppState } from '../../app.state';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  subscriber!: Subscription;
  //products!: Product[];
  status$: Observable<string> = this.store.select(getFetchProductsStatus);


  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(fetchProducts());
  }

  ngOnDestroy(): void {

  }


}
