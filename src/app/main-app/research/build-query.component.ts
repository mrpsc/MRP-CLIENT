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
import { QueryBuilderConfig } from 'angular2-query-builder';
import { QueryBuilderClassNames } from 'angular2-query-builder/dist/components';

@Component({
  selector: 'app-build-query',
  templateUrl: './build-query.component.html',
  styleUrls: ['./build-query.component.css']
})
export class BuildQueryComponent implements OnInit, OnDestroy {
  patientResponseSubscription: Subscription;
  groups: any = [];
  catrgory: any = [];
  // query: string = '()';
  query = {
    condition: 'and',
    rules: []
  };
  config: QueryBuilderConfig = {
    fields: {}
  };
  classNames: QueryBuilderClassNames = {
    removeIcon: 'fa fa-minus',
    addIcon: 'fa fa-plus',
    button: 'btn',
    buttonGroup: 'btn-group',
    rightAlign: 'order-12 ml-auto',
    switchRow: 'd-flex px-2',
    switchGroup: 'd-flex align-items-center',
    switchRadio: 'custom-control-input',
    switchLabel: 'custom-control-label',
    switchControl: 'custom-control custom-radio custom-control-inline',
    row: 'row p-2 m-1',
    rule: 'border',
    ruleSet: 'border',
    invalidRuleSet: 'alert alert-danger',
    operatorControl: 'form-control',
    operatorControlSize: 'col-auto px-0',
    fieldControl: 'form-control',
    fieldControlSize: 'col-auto',
    inputControl: 'form-control',
    inputControlSize: 'col-auto'
  }
  title: string = '';
  description: string = '';

  conditions: Array<object> = [{ category: '', subCategory: '', operator: '', value: '' }];
  groupOfConditios: any = [{ operator: 'And', conditions: this.conditions }];
  operators: Array<string> = ['=', '<>', '<', '<=', '>', '>='];
  smallOperators: Array<string> = ['=', '<>'];
  logicOpertor: Array<string> = ['And', 'Or'];
  logicArray: Array<string> = [''];

  constructor(private formsSchemaService: PatientsFormSchemaService,
    private formsService: DynamicFormService,
    private router: Router,
    private _researchService: ResearchService) { }

  ngOnInit() {
    this.patientResponseSubscription = this.formsSchemaService.GetFirstSchema()
      .subscribe(Response => {
        if (Response) {
          const config: QueryBuilderConfig = { fields: this.config.fields };
          const res: object = JSON.parse(Response);
          const keys = Object.keys(res);
          keys.forEach(element => {
            this.groups.push(res[element].group);
            this.catrgory.push(res[element].legend);
          });
          this.groups.forEach(group => {
            group.forEach(inputEl => {
              this.config.fields[inputEl.id] = {
                name: String(inputEl.label),
                type: 'string'
              };
              if (inputEl.label.toLowerCase().includes('value')) {
                this.config.fields[inputEl.id].name = String(inputEl.id);
              }
              switch (inputEl.type) {
                case ('SELECT'): {
                  this.config.fields[inputEl.id].type = 'string';
                  this.config.fields[inputEl.id].options = inputEl.options.map((option) => {
                    return {
                      name: option.label,
                      value: option.value
                    };
                  });
                  break;
                }
                case ('CHECKBOX'): {
                  this.config.fields[inputEl.id].type = 'boolean';
                  break;
                }
                case ('INPUT'): {
                  if (inputEl.inputType === 'number') {
                    this.config.fields[inputEl.id].type = 'number';
                  }
                  break;
                }
              }
            });
          });
          this.config = config;
        }
      });
  }

  ngOnDestroy() {
    if (this.patientResponseSubscription) { this.patientResponseSubscription.unsubscribe(); }
  }

  run() {
    const query = {};
    query[`$${this.query.condition}`] = this.convertRules(this.query.rules);
    // const isValid = this.checkQuery();
    // if (!isValid) {
    //   return;
    // }
    this._researchService.setQuery(query);
    this.router.navigate(['./patientsResult']);
  }

  convertRules(rules: any[]): any {
    const newRules = [];
    rules.forEach(rule => {
      if (rule.condition) {
        const query = {};
        query[`$${rule.condition}`] = this.convertRules(rule.rules);
        newRules.push(query);
      } else {
        const obj = {};
        switch (rule.operator) {
          case ('contains'): {
            obj['Diagnose.Symptoms.' + rule.field] = { $regex: `.*${rule.value}.*` };
            newRules.push(obj);
            break;
          }
          case ('like'): {
            obj['Diagnose.Symptoms.' + rule.field] = { $eq: `/${rule.value}/` };
            newRules.push(obj);
            break;
          }
          case ('='): {
            obj['Diagnose.Symptoms.' + rule.field] = { $eq: rule.value };
            newRules.push(obj);
            break;
          }
          case ('!='): {
            obj['Diagnose.Symptoms.' + rule.field] = { $ne: rule.value };
            newRules.push(obj);
            break;
          }
          case ('<'): {
            obj['Diagnose.Symptoms.' + rule.field] = { $lt: rule.value };
            newRules.push(obj);
            break;
          }
          case ('<='): {
            obj['Diagnose.Symptoms.' + rule.field] = { $lte: rule.value };
            newRules.push(obj);
            break;
          }
          case ('>'): {
            obj['Diagnose.Symptoms.' + rule.field] = { $gt: rule.value };
            newRules.push(obj);
            break;
          }
          case ('>='): {
            obj['Diagnose.Symptoms.' + rule.field] = { $gte: rule.value };
            newRules.push(obj);
            break;
          }
        }
      }
    });
    return newRules;
  }
}
