import { Injectable } from '@angular/core';
import { sizeAndQtyModel } from '../models/cart.model';
import { ProductModelServer } from '../models/product.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  productList$ = new BehaviorSubject<ProductModelServer[]>([]);
  wishList$ = new BehaviorSubject<ProductModelServer[]>([]);
  cartTotal$ = new BehaviorSubject<number>(0);
  numOfProdInCart$ = new BehaviorSubject<number>(0);
  cartItemList: any[] = [];
  wishItemList: any[] = [];
  numOfItemIncart!: number;

  constructor(private _snackBar: MatSnackBar) { }

  getProducts() {
    return this.productList$.asObservable();
  }

  setProduct(product: ProductModelServer[]) {
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
    this.snackBar(product.title)
    this.calculateTotal();
    this.numOfProdInCart();
    this.productList$.next(this.cartItemList);
  }

  snackBar(title: string) {
    this._snackBar.open(`${title} added to the cart.`, 'close', {
      duration: 1500,
      horizontalPosition: "right",
      verticalPosition: "bottom",
    });
  }

  //=========== REMOVE CART ITEM============//
  removeCartItem(id: string) {
    const i = this.cartItemList.findIndex(e => e.product.id === id);
    if (i !== -1) {
      this.cartItemList.splice(i, 1)
    }
    this.calculateTotal();
    this.numOfProdInCart();
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
  }

  //=========== WISHLIST REMOVE ============//
  removeWishlish(product: ProductModelServer) {
    const wishlistItem = this.wishItemList.find(p => p.id === product.id);
    const index = this.wishItemList.indexOf(wishlistItem);
    this.wishItemList.splice(index, 1);
    this.wishList$.next(this.wishItemList);
  }

  //=========== TOTAL ============//
  calculateTotal() {
    let total: number = 0;
    this.cartItemList.forEach(e => {
      total += e.product.price * e.selectedSizeAndQty.selectedQty;
    });
    this.cartTotal$.next(total);
  }

  //=========== NUM OF PRODUCT IN CART ============//
  numOfProdInCart() {
    let numOfProd: number = 0;
    this.cartItemList.forEach(e => {
      numOfProd += e.selectedSizeAndQty.selectedQty
    });
    this.numOfProdInCart$.next(numOfProd);
  }

  //=========== BUY NOW ============//
  buyProduct(product: ProductModelServer) {
    console.log(product);
  }

}
