import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-component',
  templateUrl: './signup-component.component.html',
  styleUrls: ['./signup-component.component.scss']
})
export class SignupComponentComponent implements OnInit {
  form: FormGroup;

  constructor(private signupService: LoginService, private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
      phone: new FormControl('')
    });
  }

  onSignup(form: FormGroup) {
    this.signupService.onSignup(form.value.email, form.value.password, form.value.phone).subscribe(response => {
      console.log(response);
      this.router.navigate(['']);
    });
  }

}
