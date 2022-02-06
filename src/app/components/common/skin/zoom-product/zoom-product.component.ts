import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-zoom-product',
  templateUrl: './zoom-product.component.html',
  styleUrls: ['./zoom-product.component.scss']
})
export class ZoomProductComponent implements OnInit {
  @Input() product: {
    image: string;
  } | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
