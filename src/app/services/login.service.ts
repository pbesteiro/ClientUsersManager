import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogService } from './log.service';
import { catchError, map } from 'rxjs/operators';
import { stringify } from '@angular/compiler/src/util';

@Injectable()
export class LoginService {
  token: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private logService: LogService
  ) {}

  loginUser(email: string, password: string): any {
    var data = {
      email: email,
      password: password,
    };

    return this.http
      .post('https://vismachallenge.azurewebsites.net/api/Auth', data)
      .pipe(
        map((res: any) => res),
        catchError((err) => {
          throw new Error(err.error.errors);
        })
      );
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isAuthtenticated(): boolean {
    return (
      this.getToken() != null &&
      this.getToken() != '' &&
      this.getToken() != undefined
    );
  }

  logout(): boolean {
    localStorage.removeItem('token');
    return true;
  }
}
