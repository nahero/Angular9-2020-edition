import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

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

  signup(userEmail: string, userPassword: string) {
    return this.http
      .post<authResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
          this.apiKey,
        { email: userEmail, password: userPassword, returnSecureToken: true }
      )
      .pipe(
        catchError((errorRes) => {
          let errorMessage = 'Unknown error';
          if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
          }
          switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
              errorMessage = 'An account using this email already exists.';
          }
          return throwError(errorMessage);
        })
      );
  }
}
