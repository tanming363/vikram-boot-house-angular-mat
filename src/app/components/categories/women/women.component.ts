import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { ProductModelServer } from '../../../models/product.model';

@Component({
  selector: 'app-women',
  templateUrl: './women.component.html',
  styleUrls: ['./women.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WomenComponent implements OnInit {
  constructor(
  ) { }

  ngOnInit(): void {

  }

}