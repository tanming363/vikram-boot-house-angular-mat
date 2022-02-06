import {
  Component, OnInit, ViewChild, ChangeDetectorRef,
  Input, ElementRef, HostListener, Renderer2,
} from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { ProductModelServer } from 'src/app/models/product.model';
import { MediaMatcher } from '@angular/cdk/layout';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { SkeletonLoaderService } from 'src/app/services/skeleton-loader.service';

@Component({
  selector: 'app-filter-and-product',
  templateUrl: './filter-and-product.component.html',
  styleUrls: ['./filter-and-product.component.scss']
})
export class FilterAndProductComponent implements OnInit {
  show: boolean = false;
  mensproducts$!: Observable<ProductModelServer[]>;
  size: number[] = [];
  color: string[] = [];
  price: number[] = [];
  filterSize: number[] = [];
  filterColor: string[] = [];
  filterPrice: number[] = [];
  filterSizeLen!: number;
  filterColorLen!: number;
  filterPriceLen!: number;
  sortDirection: any;

  opened!: boolean;
  private _mobileQueryListener: () => void;
  mobileQuery: MediaQueryList;
  errorBlock: boolean = false;
  minusPixels: number | undefined;

  @Input() loader: boolean = false;
  showFiller: boolean = false;
  constructor(
    private productService: ProductsService,
    public changeDetectorRef: ChangeDetectorRef,
    public media: MediaMatcher,
    private router: Router,
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private skeletonLoaderService: SkeletonLoaderService,
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 959px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  showSkeleton$ = this.skeletonLoaderService.loadingAction$

  @ViewChild('filters') elFilters!: ElementRef;
  @HostListener('window:scroll', ['$event']) onScroll(event: any) {
    if (event.target.scrollingElement.scrollTop > 150) {
      this.minusPixels = event.target.scrollingElement.scrollTop - 100;
      this.renderer.addClass(this.elFilters.nativeElement, 'showMainNav');
    } else {
      this.renderer.removeClass(this.elFilters.nativeElement, 'showMainNav');
    }
  }

  ngOnInit(): void {
    this.mensproducts$ = this.productService.getAllProducts().pipe(
      map(data => {
        let url = this.router.url;
        if (url.includes("/men")) {
          url = url.replace(url, "gents");
        } else if (url.includes("/women")) {
          url = url.replace(url, "ladies");
        }
        return data.filter(el => url.includes(el.category));
      }),
      catchError((error: HttpErrorResponse) => {
        this.errorBlock = true;
        return throwError(error);
      })
    );
  }

  // SORTING
  sortedBy(value: string) {
    this.sortDirection = value;
    // PARAMS
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { sortBy: value ? value : null },
      queryParamsHandling: 'merge', // preserve the existing query params in the route
      skipLocationChange: false  // do trigger navigation
    });
  }

  // SIZE FILTER
  sizeFilter(value: any) {
    let params = {
      size: this.size.length ? this.size.join(",") : null,
    }
    this.filterSize = value;
    this.filterSizeLen = this.filterSize.length

    // REMOVE DUBLICATES
    this.filterSize = [...new Map(this.filterSize.map(obj => [JSON.stringify(obj), obj])).values()];

    // PARAMS
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: 'merge',
      skipLocationChange: false
    });
  }


  // COLOR FILTER
  colorFilter(value: any) {
    let params = {
      color: this.color.length ? this.color.join(",") : null,
    }
    this.filterColor = value;
    this.filterColorLen = this.filterColor.length;

    // REMOVE DUBLICATES
    this.filterColor = [...new Map(this.filterColor.map(obj => [JSON.stringify(obj), obj])).values()];

    // PARAMS
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: 'merge',
      skipLocationChange: false
    });
  }

  // PRICE FILTER
  priceFilter(value: any) {
    this.filterPrice = value;
    this.filterPriceLen = this.filterPrice.length;

    // PARAMS
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: value,
      queryParamsHandling: 'merge',
      skipLocationChange: false
    });
  }


}