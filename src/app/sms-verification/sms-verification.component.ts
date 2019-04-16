import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { VerificationService } from '../verification.service';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

import { browserRefresh } from '../app.component';

@Component({
  selector: 'app-sms-verification',
  templateUrl: './sms-verification.component.html',
  styleUrls: ['./sms-verification.component.scss']
})
export class SmsVerificationComponent implements OnInit, OnDestroy {

  form: FormGroup;

  constructor(private verificationService: VerificationService, public userService: LoginService, public router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      code: new FormControl('')
    });

    if ( browserRefresh ) {
      this.router.navigate(['/']);
    }

    if ( !localStorage.getItem('email') ) {
      this.router.navigate(['/']);
    }
  }

  Verify(form: FormGroup) {
   this.verificationService.Verify(form.value.code).subscribe(response => {
     console.log(response);
     if ( response['message'] === 'Authenticated') {
       this.router.navigate(['/confirmed']);
     }
   });
  }

  resendCode() {
    this.verificationService.SendCode(this.userService.user.email, this.userService.user.phone, this.userService.user.countrycode)
    .subscribe(response => {
      console.log(response);
    });
  }

  ngOnDestroy() {
    // localStorage.removeItem('email');
  }

}
