import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class HeadersService {

  constructor() { }

  getHeaders(jwt: boolean) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    if (jwt) {
      headers = headers.append(
        environment.authHeaderKey,
        localStorage.getItem(environment.tokenLocalStorageKey)
      )
    }
    return headers;
  }
}
