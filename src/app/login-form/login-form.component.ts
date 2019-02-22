import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  form: FormGroup;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.form = new FormGroup({
      user: new FormControl(''),
      password: new FormControl('')
    });
  }

  onLogin(form: FormGroup) {
    this.loginService.onLogin(form.value.user, form.value.password);
  }

  onSignup() {
    console.log('What is my name');
  }

}
