import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { MainAppComponent } from './main-app/main-app.component';
import { CanActivateOAuthGuard } from './shared/services/can-activate-oath-guard';
import { PatientInfoComponent } from './main-app/patient-info/patient-info.component';
import { PatientEditInfoComponent } from './main-app/patient-info/patient-info-edit.component';
import { PatientDiagnosisDetailsComponent } from './main-app/patient-info/patient-diagnosis-details.component';
import { FindPatientComponent } from './main-app/find-patient/find-patient.component';
import { CanDeactivateDiagnosisFormGuard } from './shared/services/can-diactivate-form-edit-guard';
import { ResearchComponent } from './main-app/research/research.component';
import { UserManagementComponent } from './main-app/user-management/user-management.component';
import { DiagnosManagementComponent } from './main-app/diagnos-management/diagnos-management.component';
import { PatientsResultComponent } from './main-app/research/patients-result.component';
import { BuildQueryComponent } from './main-app/research/build-query.component';


const routes: Routes = [
    { path: 'login', component: LoginRegisterComponent },
    { path: 'login/:form', component: LoginRegisterComponent },
    { path: 'register', redirectTo: 'login/1', pathMatch: 'full' },
    {
        path: '', component: MainAppComponent,
        canActivate: [CanActivateOAuthGuard],
        children: [
            { path: 'research', component: ResearchComponent, canActivate: [CanActivateOAuthGuard] },
            { path: 'findPatient', component: FindPatientComponent, canActivate: [CanActivateOAuthGuard] },
            { path: 'patientInfo', component: PatientInfoComponent, canActivate: [CanActivateOAuthGuard] },
            // { path: 'userManagement', component: UserManagementComponent, canActivate: [CanActivateOAuthGuard] },
             { path: 'diagnosManagement', component: DiagnosManagementComponent, canActivate: [CanActivateOAuthGuard] },
            { path: 'patientEdit/:id', component: PatientEditInfoComponent, canActivate: [CanActivateOAuthGuard] },
            { path: 'patientsResult', component: PatientsResultComponent, canActivate: [CanActivateOAuthGuard] },
            { path: 'buildQuery', component: BuildQueryComponent, canActivate: [CanActivateOAuthGuard] },
            {
                path: 'patientDiagnosisDetails/:id',
                component: PatientDiagnosisDetailsComponent,
                canActivate: [CanActivateOAuthGuard],
                canDeactivate: [CanDeactivateDiagnosisFormGuard]
            },
            { path: '**', redirectTo: 'findPatient' }
        ]
    },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class AppRoutingModule { }
