import { Component, OnDestroy, OnInit } from '@angular/core';
import { sizeAndQtyModel } from '../../models/cart.model';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductModelServer, SizeAndQty, Stock } from 'src/app/models/product.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})

export class CartComponent implements OnInit, OnDestroy {
  products!: ProductModelServer[];
  availableStock!: Stock[];
  finalTotal: number = 0;
  selectedQuantity!: null;
  numOfItemInCart: number = 0;
  totalArr!: number[];
  total!: number;
  subscription!: Subscription;

  constructor(
    private cartService: CartService,
    private router: Router
  ) { };

  model: sizeAndQtyModel = {
    selectedQty: null,
    selectedSize: null,
  };

  ngOnInit(): void {
    this.getProduct();
  }

  onSelectedQty() {
    return [
      this.model.selectedQty,
      this.model.selectedSize
    ]
  }

  getProduct(): void {
    this.subscription = this.cartService.getProducts().subscribe(product => {
      this.products = product;
      this.products.forEach(el => {
        el.product.sizeAndqty.forEach((ele: SizeAndQty) => {
          if (ele.forSize === el.selectedSizeAndQty.forSize) {
            this.selectedQuantity = el.selectedSizeAndQty.selectedQty;
            for (let i = 1; i < ele.availableQty + 1; i++) {
              this.availableStock.push({
                value: i,
                viewValue: i
              })
            }
          }
          else {
            this.selectedQuantity = null;
            this.selectedQuantity = el.selectedSizeAndQty.selectedQty;
          }
        })
      })
    })
  }

  removeDuplicates(array: any, key: any) {
    return array.reduce((arr: any, item: any) => {
      const removed = arr.filter((i: any) => i[key] !== item[key]);
      return [...removed, item];
    }, []);
  };

  removeItem(product: ProductModelServer): void {
    this.cartService.removeCartItem(product.id);
  }

  getSelectedProduct(product: ProductModelServer): void {
    this.router.navigate([`product/${product.id}`], {
      queryParams: {
        category: product.category,
        '': product.title
      }
    });
  }

  moveToWishList(product: ProductModelServer): void {
    this.cartService.moveToWishList(product);
  }

  onContinueShopping(): void {
    this.router.navigate(['/men',], {
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}