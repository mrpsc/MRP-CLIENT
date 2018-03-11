import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, CanActivate, Routes } from '@angular/router';
import { MatSidenavModule, MatPaginatorModule,MatTabsModule, MatTableModule,MatSortModule } from '@angular/material';

import { DynamicFormsCoreModule } from '@ng-dynamic-forms/core';
import { DynamicFormsBootstrapUIModule } from '@ng-dynamic-forms/ui-bootstrap';

import { LogoutComponent } from './login-register/logout.component';
import { EnumToOptionsFilter } from './shared/components/enum-to-options-filter.pipe';
import { EqualValidator } from './login-register/shared/equal-validator.directive';
import { PatientEditInfoComponent } from './patient-info/patient-info-edit.component';
import { TabComponent } from './shared/components/tabs/tab.component';
import { TabsComponent } from './shared/components/tabs/tabs.component';
import { PatientDiagnosisDetailsComponent } from './patient-info/patient-diagnosis-details.component';
import { CanActivateOAuthGuard } from './shared/services/can-activate-oath-guard';
import { DataFilterPipe } from './shared/components/data-filter.pipe';
import { CanDeactivateDiagnosisFormGuard } from "./shared/services/can-diactivate-form-edit-guard";

import { AppComponent } from './app.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { FindPatientComponent } from './find-patient/find-patient.component';
import { PatientInfoComponent } from './patient-info/patient-info.component';
import { MainAppComponent } from './main-app/main-app.component';

const routes: Routes = [
  { path: 'login', component: LoginRegisterComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MainAppComponent,
    LoginRegisterComponent,
    LogoutComponent,
    EqualValidator,
    PatientInfoComponent,
    PatientEditInfoComponent,
    PatientDiagnosisDetailsComponent,
    FindPatientComponent,
    TabComponent,
    TabsComponent,
    EnumToOptionsFilter,
    DataFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    ReactiveFormsModule,
    DynamicFormsCoreModule.forRoot(),
    DynamicFormsBootstrapUIModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginRegisterComponent },
      { path: 'login/:form', component: LoginRegisterComponent },
      { path: 'register', redirectTo: 'login/1', pathMatch: 'full' },
      { path: 'passwordrecovery', redirectTo: 'login/2', pathMatch: 'full' },
      { path: 'logout/:id', component: LogoutComponent },
      { path: 'patientInfo', component: PatientInfoComponent, canActivate: [CanActivateOAuthGuard] },
      { path: 'patientEdit/:id', component: PatientEditInfoComponent, canActivate: [CanActivateOAuthGuard] },
      { path: 'patientDiagnosisDetails/:id', component: PatientDiagnosisDetailsComponent, canActivate: [CanActivateOAuthGuard], canDeactivate: [CanDeactivateDiagnosisFormGuard] },
      { path: 'findPatient', component: FindPatientComponent, canActivate: [CanActivateOAuthGuard] },
      // {path: 'userManagment', component: UnderConstructionComponent, canActivate : [CanActivateOAuthGuard]},
      // {path: 'research', component: UnderConstructionComponent, canActivate : [CanActivateOAuthGuard]},
      // {path: 'personalInfo', component: UnderConstructionComponent, canActivate : [CanActivateOAuthGuard]},
      // {path: '', redirectTo: 'findPatient', pathMatch:'full', canActivate : [CanActivateOAuthGuard]},
      // {path: '**', redirectTo: 'findPatient', pathMatch:'full', canActivate : [CanActivateOAuthGuard]},
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: '**', redirectTo: 'login', pathMatch: 'full' }
    ])
  ],
  providers: [CanActivateOAuthGuard, CanDeactivateDiagnosisFormGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
