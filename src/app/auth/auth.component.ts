import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth-service.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  isLoginMode = true;

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (this.isLoginMode) {
      // ...
    } else {
      this.authService.signup(form.value.email, form.value.password);
      form.reset();
    }
  }
}
