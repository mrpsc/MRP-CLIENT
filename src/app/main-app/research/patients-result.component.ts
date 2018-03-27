import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResearchService } from "../../shared/services/research.service";
import { ResearchModel } from "../../main-app/research/researchModel";

@Component({
  selector: 'app-patients-result',
  templateUrl: './patients-result.component.html',
  styleUrls: ['./patients-result.component.css']
})
export class patientsResultComponent implements OnInit  {
    current : ResearchModel = new ResearchModel;
    patients : any = [];
    columns : Array<string>;
    count : number;
    limit : number;
    skip : number;
    requestIndex : number;

  constructor(private router:Router, private _ResearchService : ResearchService) { 
    this.requestIndex = 1;    
    this.setResult(this._ResearchService.getCurrentPatients());
    this.limit = 8;
    this.skip = 0;
  }
    
  ngOnInit() {}

  
  setResult (result){
    this.patients = result.patients;
    this.count = result.count;
    this.columns = [];
    for(let i=0; i<this.patients.length; i++){
      let patient = this.patients[i].Diagnosis.Symptoms;
      let keys = Object.keys(patient);
      for(let j=0; j<keys.length; j++){
      
        if(this.columns.indexOf(keys[j]) == -1){
          this.columns.push(keys[j]);
        }
      }
    }
  }

  moveNextPage(){
    this.skip = this.skip + this.limit;
    this._ResearchService.getPatients(null,this.limit,this.skip);
    this.setResult( this._ResearchService.getCurrentPatients());
     this.requestIndex = this.requestIndex + 1;
  }

  moveBackPage(){
    this.skip = this.skip - this.limit;
    this._ResearchService.getPatients(null,this.limit,this.skip);
    this.setResult( this._ResearchService.getCurrentPatients());
    this.requestIndex--;
  }

  backToResearch(){
    this.router.navigate(['./buildQuery']);
  }

  getPatientsToExcel(){
    this._ResearchService.getPatientsToExcel();
  }




}