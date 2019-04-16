import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';

export let browserRefresh = false;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'twoFactorAuthTwilio';
  subscription: Subscription;

  constructor(public router: Router) {
    this.subscription = router.events.subscribe( (event) => {
      if ( event instanceof NavigationStart) {
        browserRefresh = !router.navigated;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    // localStorage.removeItem('email');
  }
}
