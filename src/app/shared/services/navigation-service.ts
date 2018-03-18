import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { CONFIG } from '../config';
import { NavigationModel } from '../models/navigation';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NavigationService{
    configUrl;

    constructor(private http: Http, private config:CONFIG){        
        this.configUrl = "/configurations/navigation.json";
    }

    getNavigation() {
        return this.http.get(this.configUrl);
    }

}