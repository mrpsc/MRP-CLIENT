import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { CONFIG } from '../config';
import { ResearchModel } from "../../main-app/research/researchModel";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ResearchService {
  private _url: string;
  query1: ResearchModel = new ResearchModel();
  query2: ResearchModel = new ResearchModel();
  queries: Array<ResearchModel> = [];

  currentQuery: string;
  currentPatients: any;

  patientsData = {patients : [
    {Diagnosis : { Symptoms : { 'Cough':"Yes"}},PatientId:"222222222",Name:"Dima"},
    {Diagnosis : { Symptoms : { 'Abdominal Pain':"Yes"}},PatientId:"124",Name:"daniel"},
    {Diagnosis : { Symptoms : { 'Angiography':"Yes"}},PatientId:"222222222",Name:"Dima"},
    {Diagnosis : { Symptoms : { 'Lung Scan' :"Yes"}},PatientId:"124",Name:"daniel"},
    
    {Diagnosis : { Symptoms : {  'Height(cm)':"180"}},PatientId:"222222222",Name:"Dima"},
    {Diagnosis : { Symptoms : { 'Abdominal Pain':"Yes", 'Angiography':"Yes", 'Cough':"Yes", 'Height(cm)':"180",'Helican CT Scan':"No",'Lung Scan' :"Yes"}},PatientId:"124",Name:"daniel"},
    {Diagnosis : { Symptoms : { 'Abdominal Pain':"Yes", 'Angiography':"Yes", 'Cough':"Yes", 'Height(cm)':"180",'Helican CT Scan':"No",'Lung Scan' :"Yes"}},PatientId:"124",Name:"daniel"},
    {Diagnosis : { Symptoms : { 'Abdominal Pain':"Yes", 'Angiography':"Yes", 'Cough':"Yes", 'Height(cm)':"180",'Helican CT Scan':"No",'Lung Scan' :"Yes"}},PatientId:"124",Name:"daniel"},

    {Diagnosis : { Symptoms : { 'Height(cm)':"180"}},PatientId:"222222222",Name:"Dima"},
    {Diagnosis : { Symptoms : { 'Abdominal Pain':"Yes", 'Angiography':"Yes", 'Cough':"Yes", 'Height(cm)':"180",'Helican CT Scan':"No",'Lung Scan' :"Yes"}},PatientId:"124",Name:"daniel"},
    {Diagnosis : { Symptoms : { 'Abdominal Pain':"Yes"}},PatientId:"124",Name:"daniel"},
    {Diagnosis : { Symptoms : { 'Cough':"Yes"}},PatientId:"124",Name:"daniel"},

    {Diagnosis : { Symptoms : { 'Height(cm)':"180"}},PatientId:"222222222",Name:"Dima"},
    {Diagnosis : { Symptoms : { 'Abdominal Pain':"Yes"}},PatientId:"124",Name:"daniel"},
    {Diagnosis : { Symptoms : { 'Cough':"Yes"}},PatientId:"124",Name:"daniel"},
    {Diagnosis : { Symptoms : { 'Cough':"Yes"}},PatientId:"124",Name:"daniel"},

  ], count: 16 };

  constructor(private _http: Http, private config: CONFIG) {
    this._url = this.config.apiUrl + "api/Accounts";
    this.query2 = {
      id: 144,
      title: "young",
      description: "All the young patients", query: "'age' < 20 "
    };
    this.query1 = {
      id: 122,
      title: "pregnancy",
      description: "All pregnant girls", query: "'Is the patient pregnant?' = Yes "
    };
    this.queries = [this.query1, this.query2];
    this.currentQuery = "";

  }

  getCurrentQuery(): string {
    return this.currentQuery;
  }

  setCurrentQuery(current: string) {
    this.currentQuery = current;
  }

  getCurrentPatients() {
    return this.currentPatients;
  }

  setCurrentPatients(patients) {
    this.currentPatients = patients;
  }


  getPatients(query, limit, skip): any {
    if(query){
      this.currentQuery = query;
    }
    let accessToken:string = JSON.parse(sessionStorage.getItem('token')).token;
    let headers: Headers = new Headers({'Authorization':'Bearer '+accessToken});
    let options: RequestOptions = new RequestOptions({headers: headers});
    let body = {query:this.currentQuery};
    // const url = `${this._url}/GetPatients?limit=${limit}&skip=${skip}`;
    // return this._http.post(url,body,options)
    //     .map((response: Response) => response.json())
    //     .catch(this._handleError);

    let patients = this.patientsData.patients.slice(skip, skip + limit);
    let dataReturn = {patients : patients,count: this.patientsData.count};
    this.setCurrentPatients(dataReturn);
}
  
  getPatientsToExcel() {
    alert(this.currentPatients.result);
  }

  private _handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'server error');
}


  // saveQuery(query: ResearchModel): boolean {
  //   return true;
  // }

  // saveAndRunQuery(query: ResearchModel): any {

  //   return { result: [{ id: 122, name: "shiran" }, { id: 22, name: "roni" }], count: 2, queryId: 1 };
  // }

  // getQueries(): Array<ResearchModel> {
  //   return this.queries;
  // }

  // deleteQuery(id: number): boolean {
  //   this.queries.splice(id, 1);
  //   return true;
  // }

  // updateQuery(query: ResearchModel): boolean {
  //   return true;
  // }
  // updateAndRunQuery(query: ResearchModel, limit: number) {
  //   return { result: [{ id: 122, name: "shiran" }, { id: 22, name: "roni" }], count: 2, queryId: 1 };
  // }



}
