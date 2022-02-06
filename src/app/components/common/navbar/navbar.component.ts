import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { LoaderService } from 'src/app/services/loader.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit, OnDestroy {
  numOfItemInCart!: number;
  numOfItemInWishList!: number;
  value: string = "Shoes";
  // opened!: boolean;
  // pos!: boolean;
  subscription!: Subscription;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private cartService: CartService,
    public loaderService: LoaderService,
    private renderer: Renderer2,
  ) { }

  @ViewChild('navbarDiv')
  elDiv!: ElementRef;

  @ViewChild('navbarTop')
  elTop!: ElementRef;

  @ViewChild('navbarMain')
  elMain!: ElementRef;

  @ViewChild('sidenavContainer')
  elSidenavContainer!: ElementRef;


  navItems = [
    {
      displayName: 'home',
      route: '/home'
    },
    {
      displayName: 'men',
      route: '/men'
    },
    {
      displayName: 'women',
      route: '/women'
    },
    {
      displayName: 'kids',
      route: '/kids'
    },
  ];

  ngOnInit(): void {
    this.subscription = this.cartService.productList$.subscribe(res => {
      this.numOfItemInCart = res.length;
    })
    this.subscription = this.cartService.wishList$.subscribe(res => {
      this.numOfItemInWishList = res.length;
    })
  }

  // openeds(el: boolean) {
  //   this.pos = el;
  // }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
