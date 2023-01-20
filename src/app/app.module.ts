import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
//Custom Modules
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { HeroesModule } from './heroes/heroes.module';
//NgRx modules
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
//NgRx reducers
import { productsReducer } from './products/products/store/products.reducer';
import { productReducer } from './products/product/store/product.reducer';
import { authReducer } from './auth/store/auth.reducer';
//NgRx effects
import { ProductsEffects } from './products/products/store/products.effects';
import { ProductEffect } from './products/product/store/product.effects';
import { AuthEffect } from './auth/store/auth.effects';
//Environments
import { environment } from '../environments/environment';
//Firebase
import { AngularFireModule } from '@angular/fire/compat';
//Components
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    ProductsModule,
    HeroesModule,
    AppRoutingModule,
    AuthModule,
    StoreModule.forRoot({
      products: productsReducer,
      product: productReducer,
      auth: authReducer
    }),
    EffectsModule.forRoot([ProductsEffects, ProductEffect, AuthEffect]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true
    }),

    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
