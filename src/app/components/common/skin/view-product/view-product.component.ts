import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Subscription } from 'rxjs';
import { map } from "rxjs/operators";

import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { sizeAndQtyModel } from 'src/app/models/cart.model';
import { ProductModelServer, SizeAndQty, Stock } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { SpinnerUiService } from 'src/app/services/spinner-ui.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss'],
})

export class ViewProductComponent implements OnInit, OnDestroy {
  product!: ProductModelServer;
  availableStock!: Stock[];
  availableColors: ProductModelServer[] = [];
  availableSizesAndQty: ProductModelServer[] = [];
  itemsInCart: number = 0;
  id!: string;
  alertSize!: number;
  alertQty!: number;
  disabled: boolean = false;
  selectedColor!: ProductModelServer;

  productImages: string[] = [];
  productImages1: string = "";
  productImages2: string = "";
  productImages3: string = "";
  productImages4: string = "";
  productImages5: string = "";

  subscription!: Subscription;

  constructor(
    private cartService: CartService,
    private productService: ProductsService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router,
    private spinnerUiService: SpinnerUiService
  ) { this.spinnerUiService.spin$.next(true); }

  model: sizeAndQtyModel = {
    selectedQty: null,
    selectedSize: null,
  };

  ngOnInit(): void {
    setTimeout(() => this.spinnerUiService.spin$.next(false), 1500);

    this.subscription = this.activatedRoute.paramMap.pipe(
      map((param: ParamMap) => {
        // @ts-ignore
        return param.params.id;
      })
    ).subscribe(prodId => {
      this.id = prodId;
      this.subscription = this.productService.getSingleProduct(this.id).subscribe((prod: ProductModelServer) => {
        this.productImages1 = prod.otherImages[0];
        this.productImages2 = prod.otherImages[1];
        this.productImages3 = prod.otherImages[2];
        this.productImages4 = prod.otherImages[3];
        this.productImages5 = prod.otherImages[4];
        this.product = prod;
        this.availableSizesAndQty = prod.sizeAndqty.filter((el: ProductModelServer) => el.forSize);
      });
      this.subscription = this.productService.getAllProducts().subscribe((product) => {
        this.availableColors = product;
        product.forEach(color => {
          if (color.id === this.product.id) {
            this.selectedColor = color;
          }
        });
      })
    })
  }

  onSelectedQty() {
    return [
      this.model.selectedQty,
      this.model.selectedSize
    ]
  }

  // ADD TO CART
  addItemToCart(product: ProductModelServer) {
    let selectedQtySizeArr = this.onSelectedQty();
    let selectedQtySizeObj = { selectedQty: selectedQtySizeArr[0], selectedSize: selectedQtySizeArr[1] };
    product.selectedSize = selectedQtySizeArr[1];
    this.cartService.addtoCart(product, selectedQtySizeObj);
  }

  getSize(size: SizeAndQty, index: number) {
    this.alertSize = size.forSize;
    this.availableSizesAndQty.forEach((el, i) => {
      if (index === i) {
        this.availableStock = []
        for (let j = 1; j < el.availableQty + 1; j++) {
          this.alertQty = el.availableQty;
          this.availableStock.push({
            value: j,
            viewValue: j
          });
        }
      }
    });
    this.availableStock = this.removeDuplicates(this.availableStock, 'value');
  }

  removeDuplicates(array: any, key: any) {
    return array.reduce((arr: any, item: any) => {
      const removed = arr.filter((i: any) => i[key] !== item[key]);
      return [...removed, item];
    }, []);
  };

  openDialog() {
    this.dialog.open(DialogComponent);
  }

  buyNow(product: ProductModelServer) {
    this.router.navigate([`checkout/${product.id}`], {
      queryParams: {
        product: product.title.toString().replace(/\s/g, '-'),
      }
    });
    this.cartService.buyProduct(product);
  }

  getSelectedColorProduct(product: ProductModelServer) {
    setTimeout(() => {
      this.router.navigate(['/', product.id], {
        queryParams: {
          product: product.title.toString().replace(/\s/g, '-'),
        }
      })
    }, 300);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}