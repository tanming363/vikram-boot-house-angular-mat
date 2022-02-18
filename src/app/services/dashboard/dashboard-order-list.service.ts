import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Order } from 'src/app/models/order.model';
import { ProductModelServer, SizeAndQty } from 'src/app/models/product.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardOrderListService {
  url = environment.serverURL_dashborad_orders;

  constructor(private http: HttpClient) { }

  sendOrder(product: Order, sizeAndqty: SizeAndQty): Observable<Order> {
    const size = Object.values(sizeAndqty).map(k => k.forSize);
    const qty = Object.values(sizeAndqty).map(k => k);
    product.selectedSize = size;
    product.selectedQty = qty;
    return this.http.post<Order>(this.url, product);
  }

  getOrders(): Observable<ProductModelServer[]> {
    return this.http.get<ProductModelServer[]>(this.url).pipe(
      map((data) => data),
    );
  }


}
