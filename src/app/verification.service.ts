import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class VerificationService {

  attemptNumber = 0;
  alertMessage = '';
  timeOutMessage = '';

  constructor(private http: HttpClient, public userService: LoginService) { }

  SendCode(email: String, phone: String, code: String): Observable<any> {
    this.alertMessage = '';

    return this.http.post('http://localhost:3000/sendcode', { email: email, phone: phone, code: code}).pipe(map((response) => {
      this.attemptNumber = response['attempt'];
      if (response['alert']) {
        this.alertMessage = response['alert'];
      }
      return response;
    }));
  }

  Verify(code: Number): Observable<any> {
    this.timeOutMessage = '';
    return this.http.post('http://localhost:3000/verify', { code: code, email: this.userService.user.email }).pipe(map((response) => {
      console.log(response);
      if ( response['message'] === 'Time Has Passed' ) {
        console.log('In verificiation service for loop');
        this.timeOutMessage = response['alert'];
      }
      return response;
    }));
  }
}
