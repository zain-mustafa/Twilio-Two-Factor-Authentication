import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class VerificationService {

  constructor(private http: HttpClient, public userService: LoginService) { }

  SendCode(email: String, phone: String, code: String): Observable<any> {
    return this.http.post('http://localhost:3000/sendcode', { email: email, phone: phone, code: code}).pipe(map((response) => {
      return response;
    }));
  }

  Verify(code: Number): Observable<any> {
    return this.http.post('http://localhost:3000/verify', { code: code, email: this.userService.user.email }).pipe(map((response) => {
      return response;
    }));
  }
}
