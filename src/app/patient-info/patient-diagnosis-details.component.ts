import { Response } from '@angular/http';
import { FormArray, FormGroup, FormControl } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DynamicFormService, DynamicFormControlModel, DynamicFormGroupModel, DynamicFormArrayModel, DynamicInputModel } from "@ng-dynamic-forms/core";

import { PatientsFormSchemaService } from './../shared/services/patients-form-schema';
import { PatientsService } from './../shared/services/patients.service';
import { Patient } from './../shared/models/patient';
import { PatientDiagnosis } from './../shared/models/patient-diagnosis';
import { NavigationService } from '../shared/services/navigation-service';
import { NavigationModel, NavigationMenuItem, NavigationSubmenuItem } from '../shared/models/navigation';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/zip';

@Component({
    selector: 'mrp-patient-diagnosis-details',
    moduleId: module.id,
    templateUrl: './patient-diagnosis-details.component.html',
    styleUrls: ["../../../node_modules/bootstrap/dist/css/bootstrap.min.css",'./patient-info-edit.component.css'],
})
export class PatientDiagnosisDetailsComponent implements OnInit {
    disable: string = "";
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

    constructor(private router: Router,
        private route: ActivatedRoute,
        private patientsService: PatientsService,
        private formsSchemaService: PatientsFormSchemaService,
        private formsService: DynamicFormService,
        private navigationService: NavigationService
    ) { }

    ngOnInit(): void {
        this.$patientResponse = this.formsSchemaService.GetFirstSchema();
        this.patientResponseSubscription = this.$patientResponse.subscribe(res => {
            if (res) {                
                this.formModel = this.formsService.fromJSON(res);
                this.formGroup = this.formsService.createFormGroup(this.formModel);
                this.patientsService.changeEmitted$.subscribe(patient => {
                    this.patient = patient;
                    this.determineFormType();
                    if (this.formType == "E" && this.diagnosis.Symptoms) {
                        for (let key in this.formGroup.controls) {
                            this.formGroup.controls[key].patchValue(this.diagnosis.Symptoms);
                        }
                    }
                })                
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
            })
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
        const menu = this.formModel.find(group => group.id === id)
        if (menu) {
            this.group = menu;
        } else {
            this.group = null;
        }
    }

    submit(): void {
        if (this.formType == 'E') {
            this.patientsService.editDiagnosis(this.diagnosis).subscribe((res: Response) => {
                if (res.ok) {
                    let patient = new Patient().fromJSON(res.json());
                    this.patientsService.emitChange(patient);
                    this.onSuccessfulSave();
                }
                else
                    this.error = "we're sorry, something is wrong with the information you entered!";
            }, (error: any) => this.error = "server error!");
        }
        else {
            this.diagnosis.Id = this.patient.Diagnosis.length;
            this.patient.Diagnosis.push(this.diagnosis);
            this.patientsService.addDiagnosis(this.diagnosis).subscribe((res: Response) => {
                res.ok ? this.onSuccessfulSave() : this.error = "we're sorry, something is wrong with the information you entered!";
            }, (error: any) => this.error = "server error!");
        }
    }

    onSuccessfulSave(): void {
        this.formGroup.reset();
        this.router.navigate(['./patientInfo']);
    }

    private determineFormType(): void {
        let id = +this.route.snapshot.params['id'];
        if (id <= 0 || !(this.patient && this.patient.Diagnosis && this.patient.Diagnosis.length >= id)) {
            this.diagnosis = new PatientDiagnosis(this.patient.PatientId);
            this.pageTitle = 'new Diagnosis for ' + this.patient.PatientId;
            this.formType = 'A';
        }
        else {
            this.diagnosis = this.patient.Diagnosis[id - 1];
            this.pageTitle = 'Edit Diagnosis for ' + this.patient.Name;
            this.disable = 'disabled';
            this.formType = 'E';
        }
    }

    onChange($event: any) {
        this.diagnosis.Symptoms[$event.model.id] = $event.model._value;
    }

    // add() {
    //     this.formsService.addFormArrayGroup(this.arrayControl, this.arrayModel);
    // }

    // insert(context: DynamicFormArrayModel, index: number) {
    //     this.formsService.insertFormArrayGroup(index, this.arrayControl, context);
    // }

    // remove(context: DynamicFormArrayModel, index: number) {
    //     this.formsService.removeFormArrayGroup(index, this.arrayControl, context);
    // }

    // move (context: DynamicFormArrayModel, index: number, step: number) {
    //     this.formsService.moveFormArrayGroup(index, step, this.arrayControl, context);
    // }

    // clear() {
    //     this.formsService.clearFormArray(this.arrayControl, this.arrayModel);
    // }

    // test() {
    //     this.exampleModel.disabledUpdates.next(!this.exampleModel.disabled);
    //     this.exampleModel.valueUpdates.next("Hello Hello");
    //     console.log(JSON.stringify(this.exampleModel));
    //     this.arrayModel.get(1).group[0].valueUpdates.next("This is just a test");
    //     this.formsService.moveFormArrayGroup(2, -1, this.arrayControl, this.arrayModel);
    //     this.formsService.removeFormGroupControl(
    //         1,
    //         this.formGroup.get("bootstrapFormGroup1") as FormGroup,
    //         this.formModel[0] as DynamicFormGroupModel
    //     );
    // }

    // onBlur($event:any) {
    //     console.log(`BLUR event on ${$event.model.id}: `, $event);
    // }

    // onFocus($event:any) {
    //     console.log(`FOCUS event on ${$event.model.id}: `, $event);
    // }
}