import { Component, Input } from '@angular/core';
import { Product } from 'src/app/products/models/product.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import * as productsActions from '../products/store/products.actions';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  @Input() products!: Product[];
  subscriber!: Subscription;

  constructor(private store: Store<AppState>) { }

  delete(id: number): void {
    this.store.dispatch(productsActions.deleteProduct({id}));
  }

}
