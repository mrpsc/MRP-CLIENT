import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, CanActivate, Routes } from '@angular/router';
import { MatSidenavModule, MatPaginatorModule, MatTabsModule, MatTableModule, MatSortModule } from '@angular/material';

import { DynamicFormsCoreModule } from '@ng-dynamic-forms/core';
import { DynamicFormsBootstrapUIModule } from '@ng-dynamic-forms/ui-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';

import { LogoutComponent } from './login-register/logout.component';
import { EnumToOptionsFilter } from './shared/components/enum-to-options-filter.pipe';
import { EqualValidator } from './login-register/shared/equal-validator.directive';
import { PatientEditInfoComponent } from './main-app/patient-info/patient-info-edit.component';
import { TabsComponent } from './shared/components/tabs/tabs.component';
import { PatientDiagnosisDetailsComponent } from './main-app/patient-info/patient-diagnosis-details.component';
import { CanActivateOAuthGuard } from './shared/services/can-activate-oath-guard';
import { DataFilterPipe } from './shared/components/data-filter.pipe';
import { CanDeactivateDiagnosisFormGuard } from './shared/services/can-diactivate-form-edit-guard';

import { AppComponent } from './app.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { FindPatientComponent } from './main-app/find-patient/find-patient.component';
import { PatientInfoComponent } from './main-app/patient-info/patient-info.component';
import { MainAppComponent } from './main-app/main-app.component';
import { UserManagementComponent } from './main-app/user-management/user-management.component';
import { DiagnosManagementComponent } from './main-app/diagnos-management/diagnos-management.component';
import { ResearchComponent } from './main-app/research/research.component';
import { DiagModalComponent } from './main-app/diag-modal/diag-modal.component';
import { AppRoutingModule } from './app.routes.module';
import { PatientsService } from './shared/services/patients.service';
import { UsersService } from './shared/services/users.service';
import { PatientsResultComponent } from './main-app/research/patients-result.component';
import { BuildQueryComponent } from './main-app/research/build-query.component';
import { ResearchService } from './shared/services/research.service';
import { CONFIG } from './shared/config';
import { QueryBuilderModule } from 'angular2-query-builder';
import { FieldFilterPipe } from './shared/components/field-filter.pipe';
import { TreatmentTableComponent } from './main-app/patient-info/treatment-table/treatment-table/treatment-table.component';

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
    TabsComponent,
    EnumToOptionsFilter,
    DataFilterPipe,
    UserManagementComponent,
    DiagnosManagementComponent,
    ResearchComponent,
    PatientsResultComponent,
    BuildQueryComponent,
    DiagModalComponent,
    FieldFilterPipe,
    TreatmentTableComponent
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
    BsDatepickerModule,
    AppRoutingModule,
    QueryBuilderModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot()
    // RouterModule.forRoot([
    //   { path: 'login', component: LoginRegisterComponent },
    //   { path: 'login/:form', component: LoginRegisterComponent },
    //   { path: 'register', redirectTo: 'login/1', pathMatch: 'full' },
    //   // { path: 'passwordrecovery', redirectTo: 'login/2', pathMatch: 'full' },
    //   { path: 'logout/:id', component: LogoutComponent },

    //   { path: 'patientInfo', component: PatientInfoComponent, canActivate: [CanActivateOAuthGuard] },
    //   { path: 'patientEdit/:id', component: PatientEditInfoComponent, canActivate: [CanActivateOAuthGuard] },
    //   { path: 'patientDiagnosisDetails/:id',
    // component: PatientDiagnosisDetailsComponent, canActivate: [CanActivateOAuthGuard],
    // canDeactivate: [CanDeactivateDiagnosisFormGuard] },
    //   { path: 'findPatient', component: FindPatientComponent, canActivate: [CanActivateOAuthGuard] },
    //   // {path: 'userManagment', component: UnderConstructionComponent, canActivate : [CanActivateOAuthGuard]},
    //   // {path: 'research', component: UnderConstructionComponent, canActivate : [CanActivateOAuthGuard]},
    //   // {path: 'personalInfo', component: UnderConstructionComponent, canActivate : [CanActivateOAuthGuard]},
    //   // {path: '', redirectTo: 'findPatient', pathMatch:'full', canActivate : [CanActivateOAuthGuard]},
    //   // {path: '**', redirectTo: 'findPatient', pathMatch:'full', canActivate : [CanActivateOAuthGuard]},
    //   { path: '', redirectTo: 'login', pathMatch: 'full' },
    //   { path: '**', redirectTo: 'login', pathMatch: 'full' }
    // ])
  ],
  providers: [
    CanActivateOAuthGuard,
    CanDeactivateDiagnosisFormGuard,
    PatientsService,
    UsersService,
    CONFIG,
    ResearchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
