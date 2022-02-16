import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, DEFAULT_CURRENCY_CODE } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './services/interceptor.service';
import { MaterialModule } from './material-module/material.module';

// flex box
import { FlexLayoutModule } from '@angular/flex-layout';

// OwlCarousel
import { CarouselModule } from 'ngx-owl-carousel-o';

// components
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/cart/checkout/checkout.component';
import { PaymentMethodComponent } from './components/cart/checkout/payment-method/payment-method.component';
import { OrderSummaryComponent } from './components/cart/order-summary/order-summary.component';
import { WishlistComponent } from './components/cart/wishlist/wishlist.component';
import { ChildComponent } from './components/categories/child/child.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { NavbarComponent } from './components/common/navbar/navbar.component';
import { ProductsComponent } from './components/common/skin/products/products.component';
import { ViewProductComponent } from './components/common/skin/view-product/view-product.component';
import { ZoomProductComponent } from './components/common/skin/zoom-product/zoom-product.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { FilterComponent } from './components/common/skin/filter-and-product/filter/filter.component';
import { FilterAndProductComponent } from './components/common/skin/filter-and-product/filter-and-product/filter-and-product.component';

import { MenComponent } from './components/categories/men/men.component';
import { MensSportComponent } from './components/categories/men/mens-sport/mens-sport.component';
import { MensOfficeComponent } from './components/categories/men/mens-office/mens-office.component';
import { MensSandalComponent } from './components/categories/men/mens-sandal/mens-sandal.component';
import { MensChappalComponent } from './components/categories/men/mens-chappal/mens-chappal.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SkeletonComponent } from './components/skeleton/skeleton.component';
import { SportsComponent } from './components/categories/sports/sports.component';
import { WomenComponent } from './components/categories/women/women.component';
import { HomeComponent } from './components/categories/home/home.component';

// PIPES
import { SizeFilterPipe } from './pipe/size-filter.pipe';
import { SortPipe } from './pipe/sort.pipe';
import { ColorFilterPipe } from './pipe/color-filter.pipe';
import { PriceFilterPipe } from './pipe/price-filter.pipe';
import { DiscountCodeComponent } from './components/cart/discount-code/discount-code.component';
import { CustomerModule } from './customer/customer.module';
import { DashboardComponent } from './admin/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    CheckoutComponent,
    PaymentMethodComponent,
    OrderSummaryComponent,
    WishlistComponent,
    ChildComponent,
    FooterComponent,
    NavbarComponent,
    ProductsComponent,
    ViewProductComponent,
    ZoomProductComponent,
    DialogComponent,
    ErrorPageComponent,
    FilterComponent,
    HomeComponent,
    MenComponent,
    MensSportComponent,
    MensOfficeComponent,
    MensSandalComponent,
    MensChappalComponent,
    SignInComponent,
    SignUpComponent,
    SkeletonComponent,
    SportsComponent,
    WomenComponent,
    SizeFilterPipe,
    SortPipe,
    ColorFilterPipe,
    PriceFilterPipe,
    FilterAndProductComponent,
    DiscountCodeComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    CarouselModule,
    // CustomerModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
    {
      provide: DEFAULT_CURRENCY_CODE, useValue: 'INR'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }