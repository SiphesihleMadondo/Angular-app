import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class SharedtokenService {
  handle(access_token: any) {
    throw new Error('Method not implemented.');
  }
  private issuer = {
    login: 'https://localhost:7268/Checkuser',
    //register: 'http://127.0.0.1:8000/api/auth/register',
  };
  constructor() {}
  handleData(token: any) {
    localStorage.setItem('auth_token', token);
  }
  getToken() {
    return localStorage.getItem('auth_token');
  }
  // Verify the token
  isValidToken(): any {
    const token = this.getToken();
    if (token) {
      const payload = this.payload(token);
      if (payload) {
        return Object.values(this.issuer).indexOf(payload) > -1
          ? true
          : false;
      }
    } else {
      return false;
    }
  }
  payload(token: any) {
    const jwtPayload = token.split('.')[1];
    return window.btoa(jwtPayload);
  }
  // User state based on valid token
  isLoggedIn() {
    return this.isValidToken();
  }
  // Remove token
  removeToken() {
    localStorage.removeItem('auth_token');
  }
}
