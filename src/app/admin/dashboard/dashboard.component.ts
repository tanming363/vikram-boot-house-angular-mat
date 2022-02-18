import { Component, ViewChild, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProductModelServer } from 'src/app/models/product.model';
import { DashboardOrderListService } from 'src/app/services/dashboard/dashboard-order-list.service';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription, merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit, OnInit, OnDestroy {

  displayedColumns: string[] = [
    'firstImage',
    'articleNo',
    'discount',
    'price',
    'title',
    'color',
    'category',
    'selectedSize',
    'selectedQty'
  ];

  subscription!: Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // ELEMENT_DATA!: ProductModelServer[];
  isLoadingResults = true;
  dataSource = new MatTableDataSource<ProductModelServer>();

  constructor(private dshboardOrderListService: DashboardOrderListService) { }

  ngOnInit(): void {
    // this.dshboardOrderListService.getOrders().subscribe(res => this.dataSource.data = res as ProductModelServer[]);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.dshboardOrderListService.getOrders().pipe(catchError(() => observableOf(null)));
        }),
        map(data => {
          this.isLoadingResults = false;
          if (data === null) {
            return [];
          }
          return data;
        }),
      )
      .subscribe(data => (this.dataSource.data = data));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}