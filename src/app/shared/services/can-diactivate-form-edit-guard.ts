import { PatientEditInfoComponent } from './../../patient-info/patient-info-edit.component';

import { PatientDiagnosisDetailsComponent } from './../../patient-info/patient-diagnosis-details.component';
import { Injectable } from '@angular/core';
import { CanDeactivate } from "@angular/router";

@Injectable()
export  class CanDeactivateDiagnosisFormGuard implements CanDeactivate<PatientDiagnosisDetailsComponent> {

    canDeactivate(component: PatientDiagnosisDetailsComponent): boolean {
        if (component.formGroup.dirty) {
            let patientName = component.patient.Name;
            return confirm(`Navigate away and lose all changes to ${patientName}?`);
        }
        return true;
    }
}