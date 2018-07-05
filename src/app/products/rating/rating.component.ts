import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit, OnChanges {

  @Input() rating : number;

  width : any ;

  rating_arr : any = [];
  constructor() { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['rating'].currentValue) {
      this.rating_arr = Array(Math.round(this.rating)).fill(0);
    }
  }

  getStars(rating) {
    var val = parseFloat(rating);
    var size = val/5*100;
    return size + '%';
  }

}
