import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  user = [{
    email: '',
    phone: ''
  }];

  constructor(private http: HttpClient) { }

  onLogin(email: String, password: String): Observable<any> {
    console.log('in login service now');
    return this.http.post('http://localhost:3000/login', {email: email, pass: password}).pipe(map((response) => {
      return response;
    }));
  }

  onSignup(email: String, password: String, phone: Number, countrycode: Number ): Observable<any> {
    console.log('in signup service now');
    return this.http.post('http://localhost:3000/signup', {email: email, pass: password, ph: phone, code: countrycode})
    .pipe(map((response) => {
      return response;
    }));
  }
}
