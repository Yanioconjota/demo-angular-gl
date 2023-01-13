import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './products/product/product-detail/product-detail.component';
import { ProductsComponent } from './products/products/products.component';
import { HeroesListComponent } from './heroes/heroes-list/heroes-list.component';
import { HomeComponent } from './shared/home/home.component';

const routes: Routes = [
  { path: 'products', component: ProductsComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'heroes', component: HeroesListComponent },
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
