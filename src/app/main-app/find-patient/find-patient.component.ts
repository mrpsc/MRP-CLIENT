import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Patient } from '../../shared/models/patient';
import { User } from '../../shared/models/user';
import { PatientsService } from '../../../app/shared/services/patients.service';
import { FindPatientModel } from './find-patientModel';

@Component({
    selector: 'app-find-patient',
    templateUrl: './find-patient.component.html',
    styleUrls: ['./find-patient.component.css']
})
export class FindPatientComponent {
    patient: FindPatientModel = new FindPatientModel();
    loggedInUser: User;
    pageTitle: string = "Find Patient";
    error: string;

    constructor(private patientsService: PatientsService, private router: Router) {
        this.patient.PatientId = '';
    }

    find(): void {
        this.patientsService.getPatients(this.patient)
            .subscribe(response => {
                if (response[0]) {
                    let patient = new Patient().fromJSON(response[0]);
                    this.patientsService.emitChange(patient);
                    this.router.navigate(['./' + this.navigationAddress(patient)]);
                }
            }, error => {
                this.error="Patient is not found"
                console.log(error);
                //this.error = JSON.parse(error.body);
            });
    }

    private navigationAddress(patients: Patient): string {
        if (patients) {
            return 'patientDiagnosisDetails/0';
        }
        else
            this.error = "no patients found!";
    }
}