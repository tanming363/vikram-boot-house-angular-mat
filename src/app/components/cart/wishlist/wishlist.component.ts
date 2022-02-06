import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductModelServer } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  itemsInWishList$!: Observable<ProductModelServer[]>;
  show: boolean = false;

  constructor(
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.show = true;
    }, 800);
    this.itemsInWishList$ = this.cartService.wishList$
  }

  goToProduct(product: ProductModelServer) {
    this.router.navigate(['/product', product.id], {
      queryParams: {
        category: product.category,
        '': product.title
      }
    });
  }
  onContinueShopping() {
    this.router.navigate(['/men',], {
    });
  }

  remove(product: ProductModelServer) {
    this.cartService.removeWishlish(product);
  }

  selectedColor(product: ProductModelServer) {

  }
  selectProduct(product: ProductModelServer) {

  }
}
