import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ProductsModule } from './products/products.module';
import { productsReducer } from './products/state/products.reducer';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    ProductsModule,
    AppRoutingModule,
    StoreModule.forRoot({
      products: productsReducer
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
