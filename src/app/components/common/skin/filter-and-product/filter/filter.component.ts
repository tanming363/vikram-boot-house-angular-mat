import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ProductModelServer, SizeAndQty } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {
  minPrice!: number;
  maxPrice!: number;
  sortBy = [
    {
      value: "lowest-price-to-highest-price",
      title: "price: lowest first",
    },
    {
      value: "highest-price-to-lowest-price",
      title: "price: highest first",
    }
  ];

  allSize: any[] = [];
  allColor: string[] = [];
  allPrice: number[] = [];
  allMensProd: ProductModelServer[] = [];

  @Input() sizes: number[] = [];
  @Input() colors: string[] = [];
  @Input() prices: number[] = [];
  @Input() products!: Observable<ProductModelServer[]>;
  @Output() sortedBy: EventEmitter<string> = new EventEmitter<string>();
  @Output() sizeFilterBy: EventEmitter<number> = new EventEmitter<number>();
  @Output() colorFilterBy: EventEmitter<number> = new EventEmitter<number>();
  @Output() priceFilterBy: EventEmitter<number> = new EventEmitter<number>();

  subscription!: Subscription;

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.subscription = this.productService.getAllProducts().subscribe(res => {
      this.allMensProd = res.filter(product => product.category === 'men');

      res.filter((product) => {
        // SIZE
        product.sizeAndqty.forEach((ele: any) => {
          if (ele.forSize) {
            const index = this.allSize.indexOf(ele.forSize);
            if (index === -1) this.allSize.push(ele.forSize);
          }
        })
        // COLOR
        if (product.color) {
          const index = this.allColor.indexOf(product.color)
          if (index === -1) this.allColor.push(product.color)
        }
        // PRICE
        if (product.price) {
          const index = this.allPrice.indexOf(product.price)
          if (index === -1) {
            if (product.discount) {
              let price = product.price - product.price * product.discount / 100;
              this.allPrice.push(price);
            } else {
              this.allPrice.push(product.price);
            }
          }
        }
      })

      this.allSize.sort((a: any, b: any) => {
        return a - b;
      })

      this.minPrice = Math.min(...this.allPrice);
      this.maxPrice = Math.max(...this.allPrice);
    })

  }

  sorting(event: any) {
    this.sortedBy.emit(event.value);
  }

  sizeFilter(event: any) {
    let index = this.sizes.indexOf(event.source.value);  // checked and unchecked value
    if (event.checked)
      this.sizes.push(event.source.value); // push in array cheked value
    else
      this.sizes.splice(index, 1);  // removed in array unchecked value  

    let size: any = this.sizes
    this.sizeFilterBy.emit(size);
  }

  priceFilter(event: any) {
    let price: any = { minPrice: event[0], maxPrice: event[1] };
    this.priceFilterBy.emit(price);
  }


  colorFilter(event: any) {
    let index = this.colors.indexOf(event.source.value);
    if (event.checked)
      this.colors.push(event.source.value);
    else
      this.colors.splice(index, 1);

    let color: any = this.colors
    this.colorFilterBy.emit(color);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}