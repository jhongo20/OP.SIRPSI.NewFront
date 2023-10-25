import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input("picture") picture: any;
  @Input("title") title: string;
  @Input("location") location: string;
  @Input("price") price: any;
  @Input("info") info: any;
  @Input("stars") stars: number = 0;
  public estrellas: any[] = [0];
  async ngOnInit() {
    this.estrellas.length = this.stars;
  }
  constructor() {
  }
}
