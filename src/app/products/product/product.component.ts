import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/products/models/product.model';
import { ProductsService } from 'src/app/products/services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {

  @Input() products!: Product[];
  subscriber!: Subscription;

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
  }

  delete(id: number): void {
    this.subscriber = this.productsService.deleteProduct(id)
        .subscribe(products => this.products = products);
  }

  ngOnDestroy(): void {
    if (this.subscriber) {
      this.subscriber.unsubscribe();
    }
  }

}
