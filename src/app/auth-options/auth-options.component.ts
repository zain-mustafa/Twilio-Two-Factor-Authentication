import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-options',
  templateUrl: './auth-options.component.html',
  styleUrls: ['./auth-options.component.scss']
})
export class AuthOptionsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  withSMS() {
    this.router.navigate(['/smsverification']);
  }

}
