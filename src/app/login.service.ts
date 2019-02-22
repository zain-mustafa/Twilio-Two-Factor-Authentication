import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  onLogin(username: String, password: String) {
    console.log(username + '    ' + password);
  }
}
