import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SkeletonLoaderService } from './services/skeleton-loader.service';
import { SpinnerUiService } from './services/spinner-ui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'vikram-boot-house';
  constructor(
    private spinnerUiService: SpinnerUiService,
    private skeletonLoaderService: SkeletonLoaderService,
    private router: Router,
  ) {
    // this.spinnerUiService.spin$.next(true);
  }
  // showSkeleton$ = this.skeletonLoaderService.loadingAction$
  ngOnInit() {
    // setTimeout(() => this.spinnerUiService.spin$.next(false), 1500);
    let url = this.router.url;
    url.includes("/men")
  }

}
