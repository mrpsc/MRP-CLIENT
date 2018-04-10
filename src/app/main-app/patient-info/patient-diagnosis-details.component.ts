import { Response } from '@angular/http';
import { FormArray, FormGroup, FormControl } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
    DynamicFormService, DynamicFormControlModel, DynamicFormGroupModel,
    DynamicFormArrayModel, DynamicInputModel
} from '@ng-dynamic-forms/core';
import { MedicalInstitution } from '../../shared/models/medical-institution';
import { PatientsFormSchemaService } from './../../shared/services/patients-form-schema';
import { PatientsService } from './../../shared/services/patients.service';
import { Patient } from './../../shared/models/patient';
import { PatientDiagnosis } from './../../shared/models/patient-diagnosis';
import { NavigationService } from '../../shared/services/navigation-service';
import { NavigationModel, NavigationMenuItem, NavigationSubmenuItem } from '../../shared/models/navigation';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/zip';

@Component({
    selector: 'mrp-patient-diagnosis-details',
    moduleId: module.id,
    templateUrl: './patient-diagnosis-details.component.html',
    styleUrls: ['./patient-info-edit.component.css'],
})
export class PatientDiagnosisDetailsComponent implements OnInit {
    disable: string = '';
    pageTitle: string;
    formType: string;
    error: string;
    diagnosis: PatientDiagnosis;
    patient: Patient;
    formModel: Array<DynamicFormControlModel>;
    formGroup: FormGroup = new FormGroup({});
    exampleControl: FormControl;
    exampleModel: DynamicInputModel;
    arrayControl: FormArray;
    arrayModel: DynamicFormArrayModel;
    headers: NavigationMenuItem[] = [];
    navigationSubscription: Subscription;
    patientResponseSubscription: Subscription;
    selectedMenu: NavigationMenuItem;
    group: DynamicFormControlModel;
    $patientResponse: Observable<any>;
    $navigationLoadResponse: Observable<any>;

    datePickers: any[] = [];
    basicPatienDetails: any;
    showPopup: boolean = false;

    constructor(private router: Router,
        private route: ActivatedRoute,
        private patientsService: PatientsService,
        private formsSchemaService: PatientsFormSchemaService,
        private formsService: DynamicFormService,
        private navigationService: NavigationService
    ) { }

    ngOnInit(): void {
        // this.patientsService.changeEmitted$.subscribe(patient => {this.patient = patient; debugger;});
        this.$patientResponse = this.formsSchemaService.GetFirstSchema();
        this.patientResponseSubscription = this.$patientResponse.subscribe(res => {
            if (res) {
                this.formModel = this.formsService.fromJSON(res);
                this.formGroup = this.formsService.createFormGroup(this.formModel);
                this.patientsService.changeEmitted$.subscribe(patient => {
                    this.patient = patient;
                    this.determineFormType();
                    if (this.patient && this.patient.Diagnose) {
                        this.formType = 'E';
                        this.diagnosis = this.patient.Diagnose;
                        this.pageTitle = 'Edit Diagnosis For ' + this.patient.PatientId;
                    } else {
                        this.formType = 'A';
                        this.pageTitle = 'Add diagnosis For ' + this.patient.PatientId;
                    }
                    if (this.formType === 'E' && this.diagnosis.Symptoms) {
                        for (const key in this.formGroup.controls) {
                            this.formGroup.controls[key].patchValue(this.diagnosis.Symptoms);
                        }
                    }
                });
            }

        });

        this.$navigationLoadResponse = this.navigationService.getNavigation();
        this.navigationSubscription = this.$navigationLoadResponse.subscribe(res => {
            const navigationModel = res.json();
            this.headers = navigationModel.headers;
        });

        Observable.zip(this.$navigationLoadResponse,
            this.$patientResponse).subscribe(data => {
                if (this.headers && this.headers.length > 0) {
                    this.selectMenu(this.headers[0].id);
                }
            });
    }

    selectMenu(id: string) {
        const menu = this.headers.find(header => header.id === id);
        if (menu) {
            this.selectedMenu = menu;
            if (menu && menu.subMenus && menu.subMenus.length > 0) {
                const subMenu = menu.subMenus[0];
                this.selectSubMenu(subMenu.tabId);
            }
        } else {
            this.selectedMenu = null;
        }
    }

    selectSubMenu(id: string) {
        if (this.formModel) {
            const menu = this.formModel.find(group => group.id === id)
            if (menu) {
                this.group = menu;
            } else {
                this.group = null;
            }
        }
    }

    submit(): void {
        if (this.formType === 'E') {
            this.patientsService.editDiagnosis(this.diagnosis).subscribe((res: Response) => {
                if (res && res.ok) {
                    this.patientsService.emitChange(this.patient);
                    this.onSuccessfulSave();
                } else {
                    this.error = 'we\'re sorry, something is wrong with the information you entered!';
                }
            }, (error: any) => this.error = 'server error!');
        } else {
            this.diagnosis.DoctorName = !this.diagnosis.DoctorName ? 'Dr. Levy' : this.diagnosis.DoctorName;
            if (Object.getOwnPropertyNames(this.diagnosis.MedicalInstitution).length === 0) {
                const institution = new MedicalInstitution();
                institution.Name = 'Tel Hashomer';
                institution.Id = 1;
                this.diagnosis.MedicalInstitution = institution;
            }
            this.patient.Diagnosis.push(this.diagnosis);
            this.patientsService.editDiagnosis(this.diagnosis).subscribe((res: Response) => {
                res.ok ? this.onSuccessfulSave() : this.error = 'we\'re sorry, something is wrong with the information you entered!';
            }, (error: any) => this.error = 'server error!');
        }
    }

    onSuccessfulSave(): void {
        this.showPopup = true;
        this.determineFormType();
    }

    private determineFormType(): void {
        const id = +this.route.snapshot.params['id'];
        if (id <= 0 || !(this.patient && this.patient.Diagnose)) {
            if (!(this.patient && this.patient.Name)) {
                this.router.navigate(['/findPatient']);
            } else if (!this.patient.Diagnose) {
                this.diagnosis = new PatientDiagnosis(this.patient.PatientId);
                this.pageTitle = 'new Diagnosis for ' + this.patient.PatientId;
                this.formType = 'A';
            } else {
                this.diagnosis = this.patient.Diagnose;
                this.pageTitle = 'Edit Diagnosis For ' + this.patient.PatientId;
                this.disable = 'disabled';
                this.formType = 'E';
            }
        }
    }

    onChange(e: any) {
        let value = e.control.value;
        if (e.model.inputType === 'number') {
            value = Number(value);
        } else if (e.model.type === 'DATEPICKER') {
            value = e.$event;
        }
        this.diagnosis.Symptoms[e.model.id] = value;
    }
}
