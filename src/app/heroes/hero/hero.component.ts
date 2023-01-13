import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroComponent implements OnInit {

  @Input() data!: Observable<any>;
  heroesList: string[] = [];

  constructor(private cd: ChangeDetectorRef) {
    //
  }

  ngOnInit(): void {
    //init something
    this.data.subscribe(item => {
      this.heroesList = [...this.heroesList, item];
      console.log(this.heroesList);
      this.cd.markForCheck();
    })
  }

  // update() {
  //   this.cd.detectChanges();
  // }

}
