import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormGroup, FormControl } from '@angular/forms';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
// import { OptionsObject } from '../../shared/models/custom-control-models';
  

@Component({
  selector: 'app-cp',
  templateUrl: './control-property.component.html',
  styleUrls: ['./control-property.component.css']
})
export class ControlProperty implements OnChanges {
    ngOnChanges(): void {
      if(this.labelName == 'relation'){
        if(this.controlObject.relation && this.controlObject.relation.length > 0
        && this.controlObject.relation[0].when && this.controlObject.relation[0].when.length){
          this._enableRelation = true;
        }
        else {
          this._enableRelation = false;      
        }
        alert(this._enableRelation );
      }
     
    }
  @Input() controlObject: any = new Object();
  @Input() labelName: string = '';
  @Input() options: any[];
  newOptKey: string = '';
  newOptVal: string = '';
  currentOpt: string;
  _enableRelation: boolean = false;

  
  set value(value:string){
    this.controlObject[this.labelName] = value;
    }
    
        get value():string {
    return this.controlObject[this.labelName].toString();
        }

        enableRelation() : void{
        this._enableRelation = !this._enableRelation;
        if(!this._enableRelation){
        this.controlObject.relation = [];
       } else{
         if(this.controlObject.relation.length == 0){

         }
       }
          }
       
          deleteCondition(condition) : void{
            var index = this.controlObject.relation[0].when.indexOf(condition);
            this.controlObject.relation[0].when.splice(index,1);
              }

  expanded: boolean = false;
  model: Object;
  disable: string = "";
  pageTitle: string;
  formType: string;
  error: string;
  formGroup: FormGroup = new FormGroup({});
  exampleControl: FormControl;
  arrayControl: FormArray;
  
  constructor() { 
  
  }

onExpandClick(): void {
    this.expanded = !this.expanded;
}

onDelOptClick(): void {
  let optForDel = this.controlObject.options.find(opt => opt["value"] == this.currentOpt);
  this.controlObject.options.splice(this.controlObject.options.indexOf(optForDel), 1);
}

onAddOptClick(): void {
  if(  !(this.controlObject.options && this.controlObject.options.length > 0)){ 
    this.controlObject.options = [];
  }
  
  //let tmp: OptionsObject = 
  
 
  this.controlObject.options.push(
    {
      disabled: false,
      label: this.newOptKey,
      value: this.newOptVal
    }
  );

  this.newOptKey = '';
  this.newOptVal = '';
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
