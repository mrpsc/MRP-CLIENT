import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

import { PatientDiagnosis } from '../models/patient-diagnosis';
import { FindPatientModel } from '../../find-patient/find-patientModel';
import { CONFIG } from '../../shared/config';
import { Patient } from '../models/patient';

@Injectable()
export class PatientsService{
    private _url: string;
    private emitChangeSource = new BehaviorSubject<Patient>(null);
    // Observable string streams
    changeEmitted$ = this.emitChangeSource.asObservable();
    // Service message commands
    emitChange(change: Patient) {
        this.emitChangeSource.next(change);
    }

    constructor(private _http: Http,private config:CONFIG){
        this._url = this.config.apiUrl+"api/Patients";
    }

    getPatients(findPatientModel:FindPatientModel):Observable<Patient>{
        let accessToken:string = JSON.parse(sessionStorage.getItem('token')).token;
        let headers: Headers = new Headers({'Authorization':'Bearer '+accessToken});
        let options: RequestOptions = new RequestOptions({headers: headers});
        return this._http.post(this._url+"/GetPatients",findPatientModel,options)
            .map((response: Response) => response.json())
            .catch(this._handleError);
    }

    addPatient(patient:Patient):any{
        let accessToken:string = JSON.parse(sessionStorage.getItem('token')).token;
        let headers: Headers = new Headers({'Authorization':'Bearer '+accessToken});
        let options: RequestOptions = new RequestOptions({headers: headers});
        return this._http.post(this._url+"/AddPatient",patient,options)
            .map((res:Response) => res)
            .catch(this._handleError);
    }

    addDiagnosis(diagnosis:PatientDiagnosis):any{
        let accessToken:string = JSON.parse(sessionStorage.getItem('token')).token;
        let headers: Headers = new Headers({'Authorization':'Bearer '+accessToken});
        let options: RequestOptions = new RequestOptions({headers: headers});
        return this._http.post(this._url+"/AddDiagnosis",diagnosis,options)
            .map((res:Response) => res)
            .catch(this._handleError);
    }

    editPatient(patient:Patient):any{
        let accessToken:string = JSON.parse(sessionStorage.getItem('token')).token;
        let headers: Headers = new Headers({'Authorization':'Bearer '+accessToken});
        let options: RequestOptions = new RequestOptions({headers: headers});
        return this._http.put(this._url+"/EditPatient",patient,options)
            .map((res:Response) => res)
            .catch(this._handleError);
    }

    editDiagnosis(diagnosis:PatientDiagnosis):any{
        let accessToken:string = JSON.parse(sessionStorage.getItem('token')).token;
        let headers: Headers = new Headers({'Authorization':'Bearer '+accessToken});
        let options: RequestOptions = new RequestOptions({headers: headers});
        return this._http.put(this._url+"/EditDiagnosis",diagnosis,options)
            .map((res:Response) => res)
            .catch(this._handleError);
    }

    private _handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'server error');
    }

    
}