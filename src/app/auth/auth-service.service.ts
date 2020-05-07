import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiKey = 'AIzaSyBBUw-pog7oJFQqZO7hrN-YwZ32Lc7nlUs';
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) {}

  // SIGNUP
  signup(userEmail: string, userPassword: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
          this.apiKey,
        { email: userEmail, password: userPassword, returnSecureToken: true }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(resData);
        })
      );
  }

  // LOGIN
  login(userEmail: string, userPassword: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
          this.apiKey,
        {
          email: userEmail,
          password: userPassword,
          returnSecureToken: true, // not needed, is true by default
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(resData);
        })
      );
  }

  // HANDLE AUTHENTICATION
  private handleAuthentication(resData) {
    const expirationDate = new Date(
      new Date().getTime() + +resData.expiresIn * 1000
    );
    const user = new User(
      resData.email,
      resData.localId,
      resData.idToken,
      expirationDate
    );
    this.user.next(user);
  }

  // HANDLE ERROR
  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'Unknown error';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'An account using this email already exists.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email was not found.';
        break;
      case 'USER_DISABLED':
        errorMessage = 'This account has been disabled.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'The password you entered is invalid';
    }
    return throwError(errorMessage);
  }
}
