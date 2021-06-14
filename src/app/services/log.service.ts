import { Injectable } from '@angular/core';

@Injectable()
export class LogService {
  log(messagge: any) {
    console.log(messagge);
  }
}
