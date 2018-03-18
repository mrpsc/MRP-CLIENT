import { Observable } from 'rxjs/Observable';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';
import { PatientsService } from '../shared/services/patients.service';
import { Patient, Gender, Race } from '../shared/models/patient';
import { Subscription } from "rxjs/Subscription";

@Component({
    selector: 'mrp-patient-edit',
    moduleId: module.id,
    templateUrl: './patient-info-edit.component.html',
    styleUrls:['./patient-info-edit.component.css']
})
export class PatientEditInfoComponent implements OnInit,OnDestroy {
    patient: Patient;
    races: string[] = Object.keys(Race).map(k => Race[k]);
    genders: string[] = Object.keys(Gender).map(k => Gender[k]);
    pageTitle: string;
    formType: string;
    addOrSave: string = "";
    error: string;
    isFieldDisabled: boolean;
    sub:Subscription;

    constructor(private router: Router, private route: ActivatedRoute, private patientService: PatientsService) { }

    ngOnInit(){
        this.patientService.changeEmitted$.subscribe(patient => this.patient = patient);
        this.sub = this.route.params.subscribe(params => this.determineFormType());
    }

    ngOnDestroy(){
        this.sub.unsubscribe();
    }

    addDiagnosis(): void {
        this.router.navigate(['./patientDiagnosisDetails/0']);
    }

    submit(): void {
        if (this.formType == "A") {
            this.patient.InclusionDate = new Date();
            this.patientService.addPatient(this.patient)
                .subscribe((res: Response) => {
                    if(res.ok){
                        this.patientService.emitChange(this.patient);
                        this.router.navigate(['./patientDiagnosisDetails/0']);
                    }
                    else
                        this.error = "we're sorry, something is wrong with the information you entered!";
                },(error: any) => this.error = "Server Error, Patient wasn't saved!");
        }
        else
            this.patientService.editPatient(this.patient)
                .subscribe((res: Response) => {
                    if(res.ok){
                        let patient = new Patient().fromJSON(res.json());
                        this.patientService.emitChange(patient);
                       this.router.navigate(['./patientDiagnosisDetails/0']);
                    }
                    else
                        this.error = "we're sorry, something is wrong with the information you entered!";
                },(error: any) => this.error = "Server Error, Patient wasn't saved!");
        
    }

    onBack(): void {
        if (this.formType == "A")
            this.router.navigate(['./findPatient']);
        else
            this.router.navigate(['./patientInfo']);
    }

    private determineFormType(): void {
        if (this.route.snapshot.params['id'] == 1 && this.patient && this.patient.PatientId) {
            this.formType = "E";
            this.addOrSave = 'Save Changes';
            this.pageTitle = 'Edit Details: ' + this.patient.Name;
            this.isFieldDisabled = true;
        }
        else if (!(this.patient && this.patient.PatientId))
            this.router.navigate(['./findPatient']);
        else {
            this.patient = new Patient();
            this.formType = "A";
            this.addOrSave = 'Add New';
            this.pageTitle = 'Add New Patient';
            this.isFieldDisabled = false;
        }
    }

}