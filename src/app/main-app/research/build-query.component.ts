import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  DynamicFormService, DynamicFormControlModel, DynamicFormGroupModel,
  DynamicFormArrayModel, DynamicInputModel
} from '@ng-dynamic-forms/core';
import { FormArray, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { PatientsFormSchemaService } from './../../shared/services/patients-form-schema';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { ResearchService } from '../../shared/services/research.service';
import { QueryBuilderConfig } from 'angular2-query-builder';
import { QueryBuilderClassNames } from 'angular2-query-builder/dist/components';

const treatments = [
  'Antiplatelet Treatment', 'Non-Antiagulant Therapy', 'INR Control',
  'IVC Filter', 'Treatment After Complications', 'Acute Treatment', 'Long-Term Treatment'
];

@Component({
  selector: 'app-build-query',
  templateUrl: './build-query.component.html',
  styleUrls: ['./build-query.component.css']
})
export class BuildQueryComponent implements OnInit, OnDestroy {

  public queryCtrl: FormControl;
  patientResponseSubscription: Subscription;
  groups: any = [];
  catrgories: any = [];
  // query: string = '()';
  query = {
    condition: 'and',
    rules: []
  };
  config: QueryBuilderConfig = {
    fields: {}
  };
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
    private _researchService: ResearchService,
    private formBuilder: FormBuilder) {
    this.queryCtrl = this.formBuilder.control(this.query);
  }

  onChangeCategory(rule: any, cat: string) {
    rule['category'] = cat;
  }

  ngOnInit() {
    this.patientResponseSubscription = this.formsSchemaService.GetFirstSchema()
      .subscribe(Response => {
        if (Response) {
          const config: QueryBuilderConfig = { fields: this.config.fields };
          const res: object = JSON.parse(Response);
          const keys = Object.keys(res);
          keys.forEach(element => {
            const group = res[element].group;
            this.catrgories.push(res[element].legend);
            group.forEach(inputEl => {
              this.config.fields[inputEl.id] = {
                name: String(inputEl.name),
                type: inputEl.type
              };
              if (res[element].legend === 'Acute Treatment') {
              }
              this.config.fields[inputEl.id]['cat'] = res[element].legend;
              if (inputEl.name.toLowerCase().includes('value')) {
                this.config.fields[inputEl.id].name = String(inputEl.id);
              }
              switch (inputEl.type) {
                case ('SELECT'): {
                  this.config.fields[inputEl.id].type = 'category';
                  this.config.fields[inputEl.id].options = inputEl.options.map((option) => {
                    return {
                      name: option.label,
                      value: option.value
                    };
                  });
                  break;
                }
                case ('DATEPICKER'): {
                  this.config.fields[inputEl.id].type = 'string';
                  break;
                }
                case 'TEXTAREA':
                case 'text': {
                  this.config.fields[inputEl.id].type = 'string';
                  break;
                }
                case ('TIMEPICKER'): {
                  this.config.fields[inputEl.id].type = 'string';
                  break;
                }
                case ('INPUT'): {
                  if (inputEl.inputType === 'number') {
                    this.config.fields[inputEl.id].type = 'number';
                  } else {
                    this.config.fields[inputEl.id].type = 'string';
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
    const result = this.convertRules(this.query.rules);
    if (result == null || result.length === 0) {
      alert('you must fill all the fields');
      return;
    } else {
      query[`$${this.query.condition}`] = result;
      this._researchService.setQuery(query);
      // this.router.navigate(['./patientsResult']);
    }

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
        if (treatments.includes(rule.category)) {
          const propMatch = {};
          switch (rule.operator) {
            case ('contains'): {
              propMatch[rule.field] = { $regex: `.*${rule.value}.*` };
              break;
            }
            case ('like'): {
              propMatch[rule.field] = { $eq: `/${rule.value}/` };
              break;
            }
            case ('='): {
              propMatch[rule.field] = { $eq: rule.value };
              break;
            }
            case ('!='): {
              propMatch[rule.field] = { $ne: rule.value };
              break;
            }
            case ('<'): {
              propMatch[rule.field] = { $lt: rule.value };
              break;
            }
            case ('<='): {
              propMatch[rule.field] = { $lte: rule.value };
              break;
            }
            case ('>'): {
              propMatch[rule.field] = { $gt: rule.value };
              break;
            }
            case ('>='): {
              propMatch[rule.field] = { $gte: rule.value };
              break;
            }
          }
          obj['Diagnose.Symptoms.' + rule.category] = { '$elemMatch': propMatch };
          newRules.push(obj);
        } else if (rule.value !== undefined) {
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
        } else {
          return null;
        }

      }
    });
    return newRules;
  }
}
