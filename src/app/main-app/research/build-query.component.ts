import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  DynamicFormService, DynamicFormControlModel, DynamicFormGroupModel,
  DynamicFormArrayModel, DynamicInputModel
} from '@ng-dynamic-forms/core';
import { FormArray, FormGroup, FormControl } from '@angular/forms';
import { PatientsFormSchemaService } from './../../shared/services/patients-form-schema';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { ResearchService } from '../../shared/services/research.service';


@Component({
  selector: 'app-build-query',
  templateUrl: './build-query.component.html',
  styleUrls: ['./build-query.component.css']
})
export class BuildQueryComponent implements OnInit, OnDestroy {
  patientResponseSubscription: Subscription;
  group: any = [];
  catrgory: any = [];
  query: string = '()';
  title: string = '';
  description: string = '';

  conditions: Array<object> = [{ category: '', subCategory: '', operator: '', value: '' }];
  groupOfConditios: any = [{ operator: 'And', conditions: this.conditions }];
  operators: Array<string> = ['=', '<>', '<', '<=', '>', '>='];
  logicOpertor: Array<string> = ['And', 'Or'];
  logicArray: Array<string> = [''];

  constructor(private formsSchemaService: PatientsFormSchemaService,
    private formsService: DynamicFormService,
    private router: Router,
    private _ResearchService: ResearchService) { }

  ngOnInit() {
    this.patientResponseSubscription = this.formsSchemaService.GetFirstSchema()
      .subscribe(Response => {
        if (Response) {
          const res: object = JSON.parse(Response);
          const keys = Object.keys(res);
          keys.forEach(element => {
            this.group.push(res[element].group);
            this.catrgory.push(res[element].legend);
          });
        }
      });
  }

  ngOnDestroy() {
    if (this.patientResponseSubscription) { this.patientResponseSubscription.unsubscribe(); }
  }

  addCondition(index: number) {
    this.groupOfConditios[index].conditions.push({ category: '', subCategory: '', operation: '', value: '' });
  }

  addGroup() {
    this.groupOfConditios.push({ operator: 'And', conditions: [{ category: '', subCategory: '', operation: '', value: '' }] });
    console.log(this.logicArray);
  }

  deleteCondition(groupIndex: number, conditionIndex: number) {
    if (this.groupOfConditios.length === 1 && this.groupOfConditios[groupIndex].conditions.length === 1) {
      return;
    }
    this.groupOfConditios[groupIndex].conditions.splice(conditionIndex, 1);
    if (this.groupOfConditios[groupIndex].conditions.length === 0) {
      this.groupOfConditios.splice(groupIndex, 1);
      delete this.logicArray[groupIndex];
    }
  }


  checkQuery(): boolean {
    this.query = '';
    for (let i = 0; i < this.groupOfConditios.length; i++) {
      this.query = this.query + '(';
      const condition = this.groupOfConditios[i].conditions;

      for (let j = 0; j < this.groupOfConditios[i].conditions.length; j++) {
        if (condition[j].subCategory == '' || condition[j].operator == '' || condition[j].value == '') {
          alert('you must fill all the fields');
          this.query = '()';
          return false;
        }

        this.query = this.query + ' ( "' + condition[j].subCategory.label + '"' + condition[j].operator + condition[j].value + ') ';
        if (condition.length - 1 !== j) {
          this.query = this.query + this.groupOfConditios[i].operator;
        }
      }
      this.query = this.query + ')';
      if (this.groupOfConditios.length - 1 !== i) {
        if (this.logicArray[i] == '') {
          alert('you must fill all the fields');
          this.query = '()';
          return false;
        }
        this.query = this.query + this.logicArray[i];
      }
    }
    return true;
  }

  run() {
    console.log(this.groupOfConditios);
    console.log(this.query);
    const isValid = this.checkQuery();
    if (!isValid) {
      return;
    }
    console.log(this.query);
  //   this._ResearchService.getPatients(this.query, 8, 0);
  //  // this._ResearchService.setCurrentPatients(res);
  //   this.router.navigate(['./patientsResult']);
  }
}
