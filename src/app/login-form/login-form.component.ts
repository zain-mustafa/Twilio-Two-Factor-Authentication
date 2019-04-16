import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { browserRefresh } from '../app.component';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit, OnDestroy {

  form: FormGroup;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });

    localStorage.removeItem('email');
  }

  onLogin(form: FormGroup) {
    this.loginService.onLogin(form.value.email, form.value.password).subscribe(response => {
      console.log(response);
      localStorage.setItem('email', 'email');
      this.router.navigate(['/authoptions']);
    });
  }

  ngOnDestroy() {
    // localStorage.removeItem('email');
  }

}
