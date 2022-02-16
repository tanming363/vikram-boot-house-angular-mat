import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/cart/checkout/checkout.component';
import { WishlistComponent } from './components/cart/wishlist/wishlist.component';
import { ChildComponent } from './components/categories/child/child.component';
import { ViewProductComponent } from './components/common/skin/view-product/view-product.component';
import { HomeComponent } from './components/categories/home/home.component';
import { MenComponent } from './components/categories/men/men.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SportsComponent } from './components/categories/sports/sports.component';
import { WomenComponent } from './components/categories/women/women.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'sport', component: SportsComponent },
  { path: 'kids', component: ChildComponent },
  { path: 'sports', component: SportsComponent },
  { path: 'men', component: MenComponent },
  { path: 'women', component: WomenComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'cart', component: CartComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'product/:id', component: ViewProductComponent },
  // { path: ':id', component: ViewProductComponent },
  { path: 'checkout/:id', component: CheckoutComponent },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
