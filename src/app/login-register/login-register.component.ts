import { Response } from '@angular/http';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractControl } from '@angular/forms';
import { RegistrationInfo } from './shared/registration-info';
import { LoginInfo } from './shared/login-info';
import { RecoveryInfo } from './shared/recovery-info';
import { UsersService } from '../shared/services/users.service';
import { User } from '../shared/models/user';
import { environment } from '../../environments/environment';

@Component({
    selector: 'mrp-loginRegister',
    moduleId: module.id,
    templateUrl: './login-register.component.html',
    styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent {
    pageTitle: string = 'Login Page';
    errorMsg: string;
    activeForm: number = 0;
    logInfo: LoginInfo = new LoginInfo();
    regInfo: RegistrationInfo = new RegistrationInfo();
    recInfo: RecoveryInfo = new RecoveryInfo();

    constructor(private _usersService: UsersService, private _route: ActivatedRoute, private _router: Router) {
        let id = +this._route.snapshot.params['form'];
        if (id >= 0 && id < 3)
            this.activeForm = id;
    }

    submit() {
        debugger;
        if (this.activeForm == 0) {
            if (this.logInfo.Username.length == 0) {
                alert("Please enter user");
            }
            else if (this.logInfo.Password.length == 0) {
                alert("Please enter password");
            }
            else {
                this._usersService.loginSubmit(this.logInfo)
                    .subscribe((res) => {
                        if (res) {
                            this.saveLoginInfo(JSON.parse(res._body));
                        }
                    }, err => console.log(err));
            }

        }
        else if (this.activeForm == 1) {
            this._usersService.registrationSubmit(this.regInfo)
                .subscribe((res: Response) => {
                    res.ok ? this.activeForm = 0 : this.errorMsg = 'Registration Failed'
                }, (error: any) => this.errorMsg = error);
        }
        // else{
        //     this._usersService.recoverySubmit(this.recInfo)
        //         .subscribe((res:Response) => res.ok ? this.errorMsg = 'new password has been sent to your email' : this.errorMsg = 'Recovery Failed', 
        //                 (error:any) => this.errorMsg = error);
        // }
    }

    saveLoginInfo(res: any): void {
        localStorage.setItem(environment.tokenLocalStorageKey, res.token);
        localStorage.setItem(environment.currentUser, res.currentUser[0]);
        this._router.navigate(['./findPatient']);
    }
}