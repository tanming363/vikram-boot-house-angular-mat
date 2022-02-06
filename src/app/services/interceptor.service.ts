import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { LoaderService } from './loader.service';
import { ProductModelServer } from '../models/product.model';
@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private loaderService: LoaderService) { }

  intercept(req: HttpRequest<ProductModelServer>, next: HttpHandler):
    Observable<HttpEvent<ProductModelServer>> {
    this.loaderService.isLoading.next(true);
    return next.handle(req).pipe(
      // LOADER
      finalize(() => {
        this.loaderService.isLoading.next(false);
      }),
      // ERROR
      catchError((error: HttpErrorResponse) => {
        if (error instanceof HttpErrorResponse) {
          console.log("serverside error", error);
        } else {
          console.log("clientside error", error);
        }
        // const err = new Error('test');;
        return throwError(() => error);
      })
    )

  }

}