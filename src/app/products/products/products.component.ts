import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { debounceTime } from "rxjs/operators";
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  subscriber!: Subscription;
  products!: Product[];

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
   this.subscriber = this.productsService.getProducts()
       .pipe(debounceTime(1000))
       .subscribe(products => this.products = products);
  }

  ngOnDestroy(): void {
    if (this.subscriber) {
      this.subscriber.unsubscribe();
    }
  }


}
