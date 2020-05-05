import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface authResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiKey = 'AIzaSyBBUw-pog7oJFQqZO7hrN-YwZ32Lc7nlUs';

  constructor(private http: HttpClient) {}

  signup(email: string, password: string) {
    this.http
      .post<authResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
          this.apiKey,
        { email: email, password: password, returnSecureToken: true }
      )
      .subscribe((authResponse) => {
        console.log('Auth Response received');
        console.log(authResponse);
      });
  }
}
