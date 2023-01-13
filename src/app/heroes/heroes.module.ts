import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroesListComponent } from './heroes-list/heroes-list.component';
import { HeroComponent } from './hero/hero.component';



@NgModule({
  declarations: [
    HeroesListComponent,
    HeroComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HeroesModule { }
