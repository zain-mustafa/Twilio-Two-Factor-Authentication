import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { VerificationService } from '../verification.service';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { browserRefresh } from '../app.component';

@Component({
  selector: 'app-sms-verification',
  templateUrl: './sms-verification.component.html',
  styleUrls: ['./sms-verification.component.scss']
})
export class SmsVerificationComponent implements OnInit, OnDestroy {

  form: FormGroup;
  alert = false;
  timeout = false;
  incorrectMessage = '';

  constructor(public verificationService: VerificationService,
    public userService: LoginService,
    public router: Router,
    private snackBar: MatSnackBar ) { }

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

    if ( this.verificationService.alertMessage ) {
      this.alert = true;
    }
  }

  Verify(form: FormGroup) {
    this.timeout = false;
    this.incorrectMessage = '';
    console.log(this.incorrectMessage);

   this.verificationService.Verify(form.value.code).subscribe(response => {
     console.log(response);
    if ( response['message'] === 'Time Has Passed' ) {
      this.timeout = true;
    } else if ( response['message'] === 'Not Authenticated') {
      this.incorrectMessage = response['alert'];
    } else if ( response['message'] === 'Authenticated') {
       this.router.navigate(['/confirmed']);
     }
   });
  }

  resendCode() {
    this.alert = false;
    this.verificationService.SendCode(this.userService.user.email, this.userService.user.phone, this.userService.user.countrycode)
    .subscribe(response => {
      if ( this.verificationService.alertMessage ) {
        this.alert = true;
      }
      console.log(response);
    });
  }

  ngOnDestroy() {
    // localStorage.removeItem('email');
  }

}
