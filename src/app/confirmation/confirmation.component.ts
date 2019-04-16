import { Component, OnInit, OnDestroy } from '@angular/core';

import { browserRefresh } from '../app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit, OnDestroy {

  constructor(public router: Router) { }

  ngOnInit() {
    if ( browserRefresh ) {
      this.router.navigate(['/']);
    }

    if ( !localStorage.getItem('email') ) {
      this.router.navigate(['/']);
    }
  }

  ngOnDestroy() {
    localStorage.removeItem('email');
  }

}
