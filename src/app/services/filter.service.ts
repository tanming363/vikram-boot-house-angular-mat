import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductModelServer } from "../models/product.model";
import { ProductsService } from './products.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor(private productService: ProductsService) { }

  // Sorting Filter
  // sortProducts(products: ProductModelServer[], value: string | any) {
  //   if (value === 'lowest-price-to-highest-price') {
  //     return products.sort((a, b) => {
  //       if (a.price < b.price) {
  //         return -1;
  //       } else if (a.price > b.price) {
  //         return 1;
  //       }
  //       return 0;
  //     })
  //   } else if (value === 'highest-price-to-lowest-price') {
  //     return products.sort((a, b) => {
  //       if (a.price > b.price) {
  //         return -1;
  //       } else if (a.price < b.price) {
  //         return 1;
  //       }
  //       return 0;
  //     })
  //   }
  // }
  // Products;
  // private get products(): Observable<ProductModelServer[]> {
  //   return this.Products = this.productService.getAllProducts();
  // }

  // filterSizeOfProducts(filter) {
  //   // console.log(filter);
  //   return this.products.pipe(map(product =>
  //     product.filter((item: ProductModelServer) => {
  //       if (!filter.length) return true;
  //       // console.log(item);
  //       const Tags = filter.some((prev) => { // Match Tags
  //         item.sizeAndqty.forEach((ele: any) => {
  //           // if (item.tags.includes(prev)) 
  //           if (prev == ele.forSize) {
  //             console.log(prev);
  //             // console.log(ele.forSize);
  //             return prev
  //           }
  //         })
  //       })
  //       // console.log(Tags);
  //       return Tags
  //     })
  //   ));
  //   // return product.map((el, i): any => {
  //   //   el.sizeAndqty.filter((ele: any) => {
  //   //     console.log(value == ele.forSize)
  //   //     return value === ele.forSize;
  //   //   })
  //   // })
  // }

  // getSimilarColorsProduct(products: ProductModelServer[], value) {
  //   // return value.filter(product => {
  //   //   const filteredColor = value.some(color => {
  //   //     if (product.tags) {
  //   //       if (product.tags.includes(color)) {
  //   //         return color
  //   //       }
  //   //     }
  //   //   })
  //   //   return filteredColor;
  //   // })

  //   console.log(products);
  //   return products.filter(item => {
  //     console.log(item);

  //     return item.color === value;
  //   });
  // }

  // getSize(product) {

  // }


}