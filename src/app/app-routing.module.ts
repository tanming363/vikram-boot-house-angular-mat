import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ChildComponent } from './child/child.component';
import { SportsComponent } from './sports/sports.component';
import { MenComponent } from './men/men.component';
import { WomenComponent } from './women/women.component';


const routes: Routes = [
  { path: '**', component: HomeComponent },
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'child', component: ChildComponent },
  { path: 'sports', component: SportsComponent },
  { path: 'men', component: MenComponent },
  { path: 'women', component: WomenComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
