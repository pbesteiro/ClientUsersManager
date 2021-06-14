import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { LogService } from './log.service';

@Injectable()
export class UserService {
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
      .get('https://vismachallenge.azurewebsites.net/api/user', {
        headers: headers,
      })
      .pipe(
        map((res: any) => res),
        catchError((err) => {
          throw new Error(err.error.errors);
        })
      );
  }

  get(id: number): any {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );

    return this.http
      .get('https://vismachallenge.azurewebsites.net/api/user/' + id, {
        headers: headers,
      })
      .pipe(
        map((res: any) => res),
        catchError((err) => {
          throw new Error(err.error.errors);
        })
      );
  }

  add(user: User): any {
    var userToAdd = {
      name: user.name,
      email: user.email,
      password: user.password,
      departmentId: user.departmentId,
    };

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );

    return this.http
      .post('https://vismachallenge.azurewebsites.net/api/user/', userToAdd, {
        headers: headers,
      })
      .pipe(
        map((data: any) => {
          return data;
        }),
        catchError((err) => {
          throw err;
        })
      );
  }

  updateUserData(user: User): any {
    var userToUpdate = {
      id: user.id,
      name: user.name,
      email: user.email,
      departmentId: user.departmentId,
    };

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );

    //first update the user table
    return this.http
      .put('https://vismachallenge.azurewebsites.net/api/user/', userToUpdate, {
        headers: headers,
      })
      .pipe(
        map((data: any) => {
          return data;
        }),
        catchError((err) => {
          throw err;
        })
      );
  }

  updateUserRols(user: User): any {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );

    //then rewrite the permission assigned
    var rolsIds: number[] = [];
    user.rols.forEach((rol) => {
      rolsIds.push(rol.id);
    });

    var rolsToPatch = {
      userId: user.id,
      rolsId: rolsIds,
    };

    return this.http
      .patch(
        'https://vismachallenge.azurewebsites.net/api/user/',
        rolsToPatch,
        { headers: headers }
      )
      .pipe(
        map((data: any) => {
          return data;
        }),
        catchError((err) => {
          throw err;
        })
      );
  }
}
