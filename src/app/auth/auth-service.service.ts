import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user';
import { Router } from '@angular/router';

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
  // BehaviorSubject always gives access to the previous value,
  // so we can access user even if we missed the last subject update (next)
  // also we can take(1) and not worry about unsubscribing as it does it for us after (1)
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private route: Router) {}

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

  // AUTO LOGIN
  autoLogin() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    } else {
      const loadedUser = new User(
        userData.email,
        userData.id,
        userData._token,
        new Date(userData._tokenExpirationDate)
      );
      console.log('Loaded user', loadedUser);
      console.log('User email: ' + loadedUser.email);
      console.log(
        'Expiration date: ' + new Date(userData._tokenExpirationDate)
      );
      console.log('Current date: ' + new Date());

      if (loadedUser.token) {
        this.user.next(loadedUser);
        // Get the difference between tokenExpirationDate and currentDate in miliseconds
        const expirationDate = new Date(
          userData._tokenExpirationDate
        ).getTime();
        const currentDate = new Date().getTime();
        const milisecondsRemaining = expirationDate - currentDate;
        console.log('Miliseconds remaining: ' + milisecondsRemaining);

        this.autoLogout(milisecondsRemaining);
      }
    }
  }

  // LOGOUT
  logout() {
    this.user.next(null);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    this.route.navigateByUrl('auth');
  }

  // AUTO LOGOUT on token expire
  autoLogout(expirationTime: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
      alert('Your session expired. Please login again.');
      console.log('User Token expired');
    }, expirationTime);
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
    localStorage.setItem('userData', JSON.stringify(user));
    this.autoLogout(resData.expiresIn * 1000);

    console.log('token expires in: ' + resData.expiresIn + 'seconds');
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
