import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { Rol } from '../models/rol.model';
import { LogService } from './log.service';

@Injectable()
export class RolService {
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
      .get('https://vismachallenge.azurewebsites.net/api/rol', {
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
      .get('https://vismachallenge.azurewebsites.net/api/rol/' + id, {
        headers: headers,
      })
      .pipe(
        map((res: any) => res),
        catchError((err) => {
          throw new Error(err.error.errors);
        })
      );
  }

  add(rol: Rol): any {
    var rolToAdd = {
      description: rol.description,
    };

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );

    return this.http
      .post('https://vismachallenge.azurewebsites.net/api/rol/', rolToAdd, {
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

  updateRolData(rol: Rol): any {
    var rolToUpdate = {
      id: rol.id,
      description: rol.description,
    };

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );

    //first update the rol table
    return this.http
      .put('https://vismachallenge.azurewebsites.net/api/rol/', rolToUpdate, {
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

  updateRolPermission(rol: Rol): any {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );

    //then rewrite the permission assigned
    var permissionsIds: number[] = [];
    rol.permissions.forEach((permission) => {
      permissionsIds.push(permission.id);
    });

    var permissionsToPatch = {
      rolId: rol.id,
      permissionsId: permissionsIds,
    };

    return this.http
      .patch(
        'https://vismachallenge.azurewebsites.net/api/rol/',
        permissionsToPatch,
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

  delete(id: number): any {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );

    return this.http
      .delete('https://vismachallenge.azurewebsites.net/api/rol/' + id, {
        headers: headers,
      })
      .pipe(
        map((data: any) => {
          return data;
        }),
        catchError((err) => {
          console.log(err);
          throw err;
        })
      );
  }
}
