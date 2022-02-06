import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, Input,
  OnInit, ViewEncapsulation
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { sizeAndQtyModel } from 'src/app/models/cart.model';
import { ProductModelServer } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  encapsulation: ViewEncapsulation.None,
  // changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProductsComponent implements OnInit {
  @Input() product!: ProductModelServer;
  colors: ProductModelServer[] = [];
  colors$!: Observable<ProductModelServer[]>;
  show: boolean = false;
  checked: boolean = false;
  availableColor: any[] = [];
  subscription!: Subscription;

  constructor(
    private cartService: CartService,
    private productService: ProductsService,
    private router: Router,
    public loaderService: LoaderService,
    private changeDetectorRef: ChangeDetectorRef,
  ) { }


  // checkRender(): boolean {
  //   console.log("CHECK RENDER");
  //   return true;
  // }


  ngOnInit(): void {
    this.colors$ = this.productService.getAllProducts()

    setTimeout(() => {
      this.show = true;
    }, 1000);
  }

  selectProduct(product: ProductModelServer): void {
    this.router.navigate(['/', product.id], {
      queryParams: {
        product: product.title.toString().replace(/\s/g, '-'),
      }
    });
  }

  selectedColor(product: ProductModelServer): void {
    this.router.navigate(['/', product.id], {
      queryParams: {
        product: product.title.toString().replace(/\s/g, '-'),
      }
    });
  }

  // optional
  model: sizeAndQtyModel = {
    selectedQty: null,
    selectedSize: null,
  };

  onSelectedQty() {
    return [
      this.model.selectedQty,
      this.model.selectedSize
    ]
  }

  addItemToCart(product: ProductModelServer): void {
    let selectedQtySizeArr = this.onSelectedQty();
    let selectedQtySizeObj = { selectedQty: selectedQtySizeArr[0], selectedSize: selectedQtySizeArr[1] };
    this.cartService.addtoCart(product, selectedQtySizeObj);
  }

  wishList(event: MouseEvent, product: ProductModelServer, value: boolean): void {
    event.stopPropagation();
    this.checked = !value;
    this.cartService.addToWishList(product, value);
  }

}


