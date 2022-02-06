import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { sizeAndQtyModel } from '../models/cart.model';
import { ProductModelServer } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  productList$ = new BehaviorSubject<ProductModelServer[]>([]);
  wishList$ = new BehaviorSubject<ProductModelServer[]>([]);
  cartTotal$ = new BehaviorSubject<number>(0);
  cartItemList: any[] = [];
  wishItemList: any[] = [];
  numOfItemIncart!: number;
  total!: number;

  constructor(
    private _snackBar: MatSnackBar
  ) { }

  getProducts() {
    return this.productList$.asObservable();
  }

  setProduct(product: any) {
    this.cartItemList.push(...product);
    this.productList$.next(product);
  }

  //=========== CART ============//
  addtoCart(product: ProductModelServer, qty: sizeAndQtyModel) {
    const cartItem = this.cartItemList.find(p => p.product.id === product.id && p.product.selectedSize === p.selectedSizeAndQty.selectedSize);
    if (this.cartItemList.length === 0) {
      this.cartItemList.unshift({
        product,
        selectedSizeAndQty: qty,
      })
    }
    else if (cartItem) {
      cartItem.selectedSizeAndQty = qty;
    }
    else {
      this.cartItemList.unshift({
        product,
        selectedSizeAndQty: qty,
      })
    }
    this.getTotal();
    this._snackBar.open(`${product.title} added to the cart.`, 'close', {
      duration: 2000,
      horizontalPosition: "right",
      verticalPosition: "bottom",
    });
    this.productList$.next(this.cartItemList);
  }

  //=========== REMOVE CART ITEM============//
  removeCartItem(id: string) {
    const i = this.cartItemList.findIndex(e => e.product.id === id);
    if (i !== -1) {
      this.cartItemList.splice(i, 1)
    }
    this.getTotal();
    this.productList$.next(this.cartItemList);
  }

  //=========== WISHLIST ============//
  addToWishList(product: ProductModelServer, value: boolean) {
    const wishlistItem = this.wishItemList.find(p => p.id === product.id);
    if (!wishlistItem) {
      if (!value) {
        this.wishItemList.push({
          ...product
        })
      }
    } else {
      const index = this.wishItemList.indexOf(wishlistItem);
      this.wishItemList.splice(index, 1);
    }
    this.wishList$.next(this.wishItemList);
  }

  //=========== MOVE TO WISHLIST ============//
  moveToWishList(product: ProductModelServer) {
    const wishlistItem = this.wishItemList.find(p => p.id === product.id);
    if (!wishlistItem) {
      this.wishItemList.push({
        ...product
      })
    } else {
      const index = this.wishItemList.indexOf(wishlistItem);
      // this.wishItemList.splice(index, 1);
      this.wishList$.next(this.wishItemList);
    }
    this.wishList$.next(this.wishItemList);
    this.removeCartItem(product.id)
    this.productList$.next(this.cartItemList);
    console.log(this.cartItemList);
  }

  //=========== WISHLIST REMOVE ============//
  removeWishlish(product: ProductModelServer) {
    const wishlistItem = this.wishItemList.find(p => p.id === product.id);
    const index = this.wishItemList.indexOf(wishlistItem);
    this.wishItemList.splice(index, 1);
    this.wishList$.next(this.wishItemList);
    localStorage.setItem("wishlistItems", JSON.stringify(this.wishItemList));
  }

  //=========== TOTAL ============//
  getTotal() {
    this.cartItemList.findIndex(e => {
      this.total = e.product.price * e.selectedSizeAndQty.selectedQty;
      return this.cartTotal$.next(this.total);
    });
  }

  //=========== BUY NOW ============//
  buyProduct(product: any) {
    console.log(product);
  }

}
