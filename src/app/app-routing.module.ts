import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './products/product/product.component';
import { ProductsComponent } from './products/products/products.component';

const routes: Routes = [
  {path: 'products', component: ProductsComponent},
  {path: 'products/:id', component: ProductComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
