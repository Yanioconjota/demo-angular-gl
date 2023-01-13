import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss']
})
export class HeroesListComponent implements OnInit {

  heroes = new BehaviorSubject('Iron-man');

  constructor() {
    //
  }

  ngOnInit(): void {
    //init something
  }

  addHero(item: any): void {
    this.heroes.next(item);
    console.log(item);
  }

}
