import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { LogService } from './log.service';

@Injectable()
export class PermissionService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private logService: LogService
  ) {}

  getAll(): any {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );

    return this.http
      .get('https://vismachallenge.azurewebsites.net/api/permission', {
        headers: headers,
      })
      .pipe(
        map((res: any) => res),
        catchError((err) => {
          throw new Error(err.error.errors);
        })
      );
  }
}
