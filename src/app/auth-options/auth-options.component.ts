import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { VerificationService } from '../verification.service';
import { LoginService } from '../login.service';

import { browserRefresh } from '../app.component';

@Component({
  selector: 'app-auth-options',
  templateUrl: './auth-options.component.html',
  styleUrls: ['./auth-options.component.scss']
})
export class AuthOptionsComponent implements OnInit, OnDestroy {

  public browserRefresh: boolean;

  constructor(private router: Router, public verificationService: VerificationService, public userService: LoginService) { }

  ngOnInit() {
    if ( browserRefresh ) {
      this.router.navigate(['/']);
    }

    if ( !localStorage.getItem('email') ) {
      this.router.navigate(['/']);
    }
  }

  withSMS() {
    this.verificationService.SendCode(this.userService.user.email, this.userService.user.phone, this.userService.user.countrycode)
    .subscribe(response => {
      console.log(response);
      this.router.navigate(['/smsverification']);
    });
  }

  ngOnDestroy() {
    // localStorage.removeItem('email');
  }

}
