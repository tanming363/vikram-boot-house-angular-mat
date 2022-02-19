import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Order } from 'src/app/models/order.model';
import { ProductModelServer, SizeAndQty } from 'src/app/models/product.model';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DashboardOrderListService {
  url = environment.serverURL_dashborad_orders;

  constructor(private http: HttpClient) { }

  sendOrder(product: any, sizeAndqty: SizeAndQty): Observable<Order> {
    const size = Object.values(sizeAndqty).map(k => k.forSize);
    const qty = Object.values(sizeAndqty).map(k => k);
    const t = moment().format('DD/MM/YYYY, h:mm A');

    product.selectedSize = size;
    product.selectedQty = qty;
    product.dateAndTime = t;

    const a = Math.floor(Math.random() * 4);
    const status = ["shipped", "delivered", "processing", "cancelled"]

    product.orderStatus = status[a];
    console.log(status[a]);

    delete product.id; // since I can't post same id to server so that I am deleting ID
    delete product.otherImages;
    delete product.tags;
    delete product.description;
    delete product.rating;


    return this.http.post<Order>(this.url, product);

  }

  getOrders(): Observable<ProductModelServer[]> {
    return this.http.get<ProductModelServer[]>(this.url).pipe(
      map((data) => data),
    );
  }


}
