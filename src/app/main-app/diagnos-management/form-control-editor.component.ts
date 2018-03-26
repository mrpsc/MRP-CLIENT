import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormGroup, FormControl } from '@angular/forms';
import { NavigationMenuItem } from '../../shared/models/navigation';
import { PatientDiagnosis } from '../../shared/models/patient-diagnosis';
import { Patient } from '../../shared/models/patient';
import { DynamicFormControlModel, DynamicInputModel, DynamicFormArrayModel, DynamicFormService } from '@ng-dynamic-forms/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import { PatientsService } from '../../shared/services/patients.service';
import { PatientsFormSchemaService } from '../../shared/services/patients-form-schema';
import { NavigationService } from '../../shared/services/navigation-service';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-fc-editor',
  templateUrl: './form-control-editor.component.html',
  styleUrls: ['./form-control-editor.component.css']
})
export class FormControlEditorComponent implements OnChanges {
    ngOnChanges(): void {
       
    }
  @Input() ControlObject: any = new Object();
  expanded: boolean = false;
  model: Object;
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
) {}

onExpandClick(): void {
    this.expanded = !this.expanded;
}
  ngOnInit() {
    // this.$patientResponse = this.formsSchemaService.GetFirstSchema();
    // this.patientResponseSubscription = this.$patientResponse.subscribe(res => {
    //     if (res) {                
    //         this.formModel = this.formsService.fromJSON(res);
    //         this.formGroup = this.formsService.createFormGroup(this.formModel);
    //         // this.patientsService.changeEmitted$.subscribe(patient => {
    //         //     this.patient = patient;
    //         //     this.determineFormType();
    //         //     if (this.formType == "E" && this.diagnosis.Symptoms) {
    //         //         for (let key in this.formGroup.controls) {
    //         //             this.formGroup.controls[key].patchValue(this.diagnosis.Symptoms);
    //         //         }
    //         //     }
    //         // })                
    //     }
    // });

    // this.$navigationLoadResponse = this.navigationService.getNavigation();
    // this.navigationSubscription = this.$navigationLoadResponse.subscribe(res => {
    //     const navigationModel = res.json();
    //     this.headers = navigationModel.headers;     
    // });

    // Observable.zip(this.$navigationLoadResponse,
    //     this.$patientResponse).subscribe(data => {
    //         if (this.headers && this.headers.length > 0) {
    //             this.selectMenu(this.headers[0].id);
    //         }
    //     })
  }

//   selectMenu(id: string) {
//     const menu = this.headers.find(header => header.id === id);
//     if (menu) {
//         this.selectedMenu = menu;
//         if (menu && menu.subMenus && menu.subMenus.length > 0) {
//             const subMenu = menu.subMenus[0];
//             this.selectSubMenu(subMenu.tabId);
//         }
//     } else {
//         this.selectedMenu = null;
//     }
// }

//   selectSubMenu(id: string) {
//     const menu = this.formModel.find(group => group.id === id)
//     if (menu) {
//         this.group = menu;
//     } else {
//         this.group = null;
//     }
// }

}
