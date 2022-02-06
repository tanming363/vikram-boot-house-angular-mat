import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductModelServer } from "../models/product.model";
import { environment } from 'src/environments/environment';
import { delay, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  url = environment.serverURL;

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<ProductModelServer[]> {
    return this.http.get<ProductModelServer[]>(this.url)
      .pipe(
        // delay(1000),
        map((data) => data),
      );
  }

  getSingleProduct(id: string): Observable<ProductModelServer> {
    return this.http.get<ProductModelServer>(this.url + '/' + id);
  }

}
