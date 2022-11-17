import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { Product } from 'src/app/products/models/product.model';
import { fetchProductById } from '../store/product.actions';
import * as productSelector from '../store/product.selectors';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  subscriber!: Subscription;
  product!: Product | null;
  productId!: number;
  status$: Observable<string> = this.store.select(productSelector.getFetchProductStatus);

  constructor(private routeParams: ActivatedRoute,
              private store: Store<AppState>) { }

  ngOnInit(): void {
    this.productId = +this.routeParams.snapshot.url[1].path;
    console.log(this.productId);
    this.store.dispatch(fetchProductById({id: this.productId}));
    this.subscriber = this.store.select(productSelector.getFetchProduct)
        .subscribe((product) => {
          console.log(product);
          this.product = product;
        })
  }

  ngOnDestroy(): void {
    if (this.subscriber) {
      this.subscriber.unsubscribe();
    }
  }

}
