import { MedicalInstitution } from '../../shared/models/medical-Institution';
import { PatientDiagnosis } from '../../shared/models/patient-Diagnosis';
import { Component,OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { PatientsService } from './../../shared/services/patients.service';
import { Patient, Race, Gender } from '../../shared/models/patient';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';
@Component({
    moduleId: module.id,
    templateUrl: './patient-info.component.html'
})
export class PatientInfoComponent {
    pageTitle: string = 'Patient Detail';
    races: string[] = Object.keys(Race).map(k => Race[k]);
    genders: string[] = Object.keys(Gender).map(k => Gender[k]);
    patient: Patient;
    errorMessage: string;
   // filterQuery:string = "";
  //  rowsOnPage:number = 10;
   // sortBy:string = "date";
  //  sortOrder:string = "desc";
  //  showDiagnosis:boolean;
  //  displayedColumns = ['DateofDiagnosis', 'DoctorName', 'MedicalInstitution'];
   // dataSource = new MatTableDataSource();
    

  //  @ViewChild(MatSort) sort: MatSort;
  //  @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private router: Router, private patientsService: PatientsService){
        this.patientsService.changeEmitted$.subscribe(patient => {
            this.patient = patient;
            //this.showDiagnosis = patient && patient.Diagnosis && patient.Diagnosis.length > 0;
        });
    }
 //   applyFilter(filterValue: string) {
 //       filterValue = filterValue.trim();
 //       filterValue = filterValue.toLowerCase(); 
 //       this.dataSource.filter = filterValue;
  //    }
    
    ngOnInit():void{
        if(!(this.patient && this.patient.PatientId))
            this.router.navigate(['./findPatient'])
    }
//    ngAfterViewInit() {
//        this.dataSource.sort = this.sort;
 //       this.dataSource.paginator = this.paginator;
  //    }
    openDetails(diagnosisNum:number):void{
        this.router.navigate(['./patientDiagnosisDetails/'+diagnosisNum]);
    }
}
