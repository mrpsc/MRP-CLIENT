import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-diagnos-management',
  templateUrl: './diagnos-management.component.html',
  styleUrls: ['./diagnos-management.component.css']
})
export class DiagnosManagementComponent implements OnInit {
  controls: Object[] = [];
  groupModels: any[];
  disable: string = "";
  pageTitle: string;
  formType: string;
  error: string;
  diagnosis: PatientDiagnosis;
  patient: Patient;
  formModel: any[] = [];
  formGroup: FormGroup = new FormGroup({});
  exampleControl: FormControl;
  exampleModel: DynamicInputModel;
  arrayControl: FormArray;
  arrayModel: DynamicFormArrayModel;
  headers: NavigationMenuItem[] = [];
  navigationSubscription: Subscription;  
  patientResponseSubscription: Subscription;  
  selectedMenu: NavigationMenuItem;
  group: any[];
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
  this.groupModels = []; 
  this.patientResponseSubscription = this.$patientResponse.subscribe(res => {
      if (res) {                
        this.formModel = JSON.parse(res);
        let keys = Object.keys(this.formModel);
        keys.forEach(element => {
         // let group = this.formModel[element].group;
         // group.id = this.formModel[element].id;
          this.groupModels.push(this.formModel[element]);
          console.log(this.formModel[element]);
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
    let selectedGroupModel = this.groupModels.find(group => group.id === id);
   if(selectedGroupModel)
   {
    this.group = selectedGroupModel.group;
   }
}

}
