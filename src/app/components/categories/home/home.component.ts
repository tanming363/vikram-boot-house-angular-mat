import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Observable, Subscription, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProductModelServer } from 'src/app/models/product.model';
import { ChangeDailyImgService } from 'src/app/services/change-daily-img.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit, OnDestroy {
  showCategory: boolean = false;
  showCarousel: boolean = false;
  errorBlock!: boolean;
  errorMsg!: string;
  carouselImages: any[] = [];
  categories: any[] = [];
  public mensproducts$!: Observable<ProductModelServer[]>;

  subscription!: Subscription;

  carousel: OwlOptions = {
    loop: true,
    autoplay: true,
    center: true,
    dots: true,
    autoHeight: true,
    autoWidth: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      }
    }
  }

  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<span class="material-icons-outlined">west</span>',
      '<span class="material-icons-outlined">east</span>'],
    responsive: {
      0: {
        items: 1
      },
      350: {
        items: 2.5
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      },
      1140: {
        items: 5
      }
    },
    nav: true
  }


  constructor(
    private readonly changeDailyImgService: ChangeDailyImgService,
    private productService: ProductsService,
  ) { }


  ngOnInit() {
    this.mensproducts$ = this.productService.getAllProducts().pipe(
      catchError((error: HttpErrorResponse) => {
        this.errorBlock = true;
        return throwError(error);
      })
    );

    this.showCarousel = true;
    setTimeout(() => {
      this.showCategory = true;
    }, 2000);

    this.subscription = this.changeDailyImgService.getAllImages()
      .subscribe({
        next: (res) => {
          this.carouselImages = res[0].carouselImg;
          this.categories = res[0].category;
        },
        error: (err) => {
          this.errorBlock = true;
          this.errorMsg = err.message;
        },
        complete: () => console.info('complete')
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
