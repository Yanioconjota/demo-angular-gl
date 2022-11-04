import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  subscriber!: Subscription;
  product!: Product | undefined;
  productId!: number;

  constructor(private routeParams: ActivatedRoute,
              private productsService: ProductsService) { }

  ngOnInit(): void {
    this.productId = +this.routeParams.snapshot.url[1].path;
    this.subscriber = this.productsService.getProductById(this.productId)
        .subscribe(product => this.product = product);
  }

  ngOnDestroy(): void {
    if (this.subscriber) {
      this.subscriber.unsubscribe();
    }
  }

}
