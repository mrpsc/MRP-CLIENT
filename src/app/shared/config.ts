import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class CONFIG {
    apiUrl = environment.apiUrl;
};