import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResearchService } from '../../shared/services/research.service';
import { ResearchModel } from '../../main-app/research/researchModel';

const PATIENT_LIMIT_PER_PAGE = 8;

@Component({
  selector: 'app-patients-result',
  templateUrl: './patients-result.component.html',
  styleUrls: ['./patients-result.component.css']
})
export class PatientsResultComponent implements OnInit {
  current: ResearchModel = new ResearchModel;
  patients: any = [];
  columns: Array<string>;
  count: number;
  skip: number;
  requestIndex: number;
  results: { patients, count } = { patients: [], count: 0 };

  constructor(private router: Router, private _researchService: ResearchService) {
    this.requestIndex = 1;
    this.skip = 0;
  }

  ngOnInit() {
    this.getPatients(PATIENT_LIMIT_PER_PAGE, 0);
  }

  moveNextPage() {
    this.skip = this.skip + PATIENT_LIMIT_PER_PAGE;
    this.getPatients(PATIENT_LIMIT_PER_PAGE, this.skip);
    this.requestIndex = this.requestIndex + 1;
  }

  moveBackPage() {
    this.skip = this.skip - PATIENT_LIMIT_PER_PAGE;
    this.getPatients(PATIENT_LIMIT_PER_PAGE, this.skip);
    this.requestIndex--;
  }

  getPatients(limit, skip) {
    this._researchService.getPatients(limit, skip)
      .then(success => {
        console.log(success);
        // this.setResult(this._researchService.getCurrentPatients());
      })
      .catch(error => {
        console.log(error);
      });
  }

  setResult(result) {
    this.patients = result.patients;
    this.count = result.count;
    this.columns = [];
    for (let i = 0; i < this.patients.length; i++) {
      const patient = this.patients[i].Diagnosis.Symptoms;
      const keys = Object.keys(patient);
      for (let j = 0; j < keys.length; j++) {
        if (this.columns.indexOf(keys[j]) === -1) {
          this.columns.push(keys[j]);
        }
      }
    }
  }


  backToResearch() {
    this.router.navigate(['./buildQuery']);
  }

  getPatientsToExcel() {
    this._researchService.getPatientsToExcel();
  }
}
