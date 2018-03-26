import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PatientsFormSchemaService } from '../shared/services/patients-form-schema';
import { PatientsService } from '../shared/services/patients.service';
import { UsersService } from '../shared/services/users.service';
import { User } from '../shared/models/user';
import { CONFIG } from '../shared/config';
import { NavigationService } from '../shared/services/navigation-service';

@Component({
    selector: 'mrp-main-app',
    moduleId: module.id,
    templateUrl: './main-app.component.html',
    styleUrls: ['./main-app.component.css'],
    providers: [PatientsService, UsersService, PatientsFormSchemaService, CONFIG, NavigationService]
})
export class MainAppComponent implements OnInit {
    loggedInUser: User;
    pageTitle: string = 'Medical Research Project';
    loginTitle: string;
    loggedIn: boolean = false;

    constructor(private router: Router, private usersService: UsersService) {
        this.usersService.changeEmitted$.subscribe(user => this.login(user));
    }
    ngOnInit(): void {
        let isLogin = this.router.url.includes('login') || this.router.url === '/';
        if (!this.loggedInUser && sessionStorage.getItem("token") && !isLogin) {
            this.usersService.getLoggedUser().subscribe(r => r, (error: any) => this.logout(1));
        }
    }
    login(user: User): void {
        if (user) {
            this.loggedIn = true;
            this.loggedInUser = user;
            this.loginTitle = 'hello ' + user.FullName;
        }
    }
    logout(id: number): void {
        this.loggedIn = false;
        this.usersService.logout();
        this.router.navigate(['/logout/' + (id || '0')]);
    }
}