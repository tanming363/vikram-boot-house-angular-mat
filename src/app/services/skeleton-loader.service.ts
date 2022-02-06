import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkeletonLoaderService {
  private loadingSubject = new Subject<boolean>();
  loadingAction$ = this.loadingSubject.asObservable();

  showSkeleton() {
    this.loadingSubject.next(true);
  }

  hideSkeleton() {
    this.loadingSubject.next(false);
  }
}
