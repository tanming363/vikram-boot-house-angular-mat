import { Component, Input, OnInit } from '@angular/core';
import { ProductModelServer } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss']
})
export class SkeletonComponent implements OnInit {
  constructor() { }
  ngOnInit(): void { }

}
