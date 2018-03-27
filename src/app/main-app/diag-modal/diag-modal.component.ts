import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { PatientDiagnosis } from './../../shared/models/patient-diagnosis';
import { PatientsService } from '../../shared/services/patients.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-diag-modal',
  templateUrl: './diag-modal.component.html',
  styleUrls: ['./diag-modal.component.css'],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ]
})
export class DiagModalComponent implements OnInit {

  @Input() diagnosis: PatientDiagnosis;
  @Input() visible: boolean;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  symptoms: { key: string, value: any }[] = [];
  symptomsKeys: any[];
  symptomsValues: any[];
  error: string;

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
  constructor(private _patientService: PatientsService, private _router: Router) { }

  ngOnInit() {
    console.log(this.diagnosis);
    this.symptomsKeys = Object.keys(this.diagnosis.Symptoms);
    this.symptomsValues = Object.values(this.diagnosis.Symptoms);
    for (var i = 0; i < this.symptomsKeys.length; i++) {
      var element = { key: this.symptomsKeys[i], value: this.symptomsValues[i] };
      this.symptoms.push(element);
    }
  }

  deleteDiagnosis() {
    this._patientService.deleteDiagnosis(this.diagnosis.PatientId, this.diagnosis.Id)
      .subscribe((res: Response) => {
        if (res.ok) {
          this._router.navigate(['./patientEdit/1']);
        } else
          this.error = "Sorry, the diagnosis could not be deleted";
      }, (error: any) => this.error = "Server Error, Diagnosis not deleted!");
  }
}
