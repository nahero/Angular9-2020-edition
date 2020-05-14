import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth-service.service';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  userAuthenticated = false;
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const userEmail = form.value.email;
    const userPassword = form.value.password;
    this.isLoading = true;
    let authObs: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      authObs = this.authService.login(userEmail, userPassword);
    } else {
      authObs = this.authService.signup(userEmail, userPassword);
    }

    authObs.subscribe(
      (resData) => {
        this.isLoading = false;
        form.reset();
        this.userAuthenticated = true;
        this.router.navigateByUrl('recipes');

        console.log('Auth Response received');
        console.log(resData);
      },
      (errorMessage) => {
        this.isLoading = false;
        this.error = errorMessage;
        console.log(errorMessage);
      }
    );
  }

  onHandleError() {
    this.error = null;
  }
}
