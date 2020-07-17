import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { environment } from '../environments/environment';

declare var gtag: (tag, value, params) => void;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnDestroy {

  private routerSubscription: Subscription;

  private analyticsID = environment.googleAnalyticsUA;
  public navbarOpen = false;

  constructor(private router: Router) { }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  ngAfterViewInit(): void {
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        gtag('config', this.analyticsID, { page_path: event.urlAfterRedirects });
      });
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }

}
