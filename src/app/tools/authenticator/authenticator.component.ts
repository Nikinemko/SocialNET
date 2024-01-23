import { Component } from '@angular/core';

@Component({
  selector: 'app-authenticator',
  templateUrl: './authenticator.component.html',
  styleUrls: ['./authenticator.component.less'],
})
export class AuthenticatorComponent {
  state = AuthenticatorCompState.LOGIN;
  constructor() {}

  onForgotPasswordClick() {
    this.state = AuthenticatorCompState.FORGOT_PASSWORD;
  }
  onCreateAccountClick() {
    this.state = AuthenticatorCompState.REGISTER;
  }
  onLoginClick() {
    this.state = AuthenticatorCompState.LOGIN;
  }
  isLoginState() {
    return this.state == AuthenticatorCompState.LOGIN;
  }
  isRegisterState() {
    return this.state == AuthenticatorCompState.REGISTER;
  }
  isForgotPasswordState() {
    return this.state == AuthenticatorCompState.FORGOT_PASSWORD;
  }
  getStateText() {
    switch (this.state) {
      case AuthenticatorCompState.LOGIN:
        return 'Login';
      case AuthenticatorCompState.REGISTER:
        return 'Register';
      case AuthenticatorCompState.FORGOT_PASSWORD:
        return 'Forgot Password';
    }
  }
}

export enum AuthenticatorCompState {
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD,
}
