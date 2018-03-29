import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, ResponseContentType } from '@angular/http';
import { CONFIG } from '../config';
import { ResearchModel } from '../../main-app/research/researchModel';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ResearchService {
  private _url: string;
  queries: Array<ResearchModel> = [];

  currentQuery: string;
  currentPatients: any;

  constructor(private _http: Http, private config: CONFIG) {
    this._url = this.config.apiUrl + 'api/Patients';
    this.currentQuery = '';

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

  setQuery(query) {
    this.currentQuery = query;
  }

  async getPatients(limit, skip) {
    return new Promise((res, rej) => {
      const accessToken: string = JSON.parse(sessionStorage.getItem('token')).token;
      const headers: Headers = new Headers({
        'Authorization': 'Bearer ' + accessToken,
        'Content-Type': 'application/json'
      });
      const options: RequestOptions = new RequestOptions({ headers: headers });
      const body = JSON.stringify(this.currentQuery);
      options.body = body;
      const url = `${this._url}/GetPatients?limit=${limit}&skip=${skip}`;
      this._http.post(url, body, options).subscribe((data: any) => {
        if (data) {
          res(data.json());
        } else {
          rej('Could not get patients.');
        }
      });
    });
  }

  getPatientsToExcel() {
    const accessToken: string = JSON.parse(sessionStorage.getItem('token')).token;
    const headers: Headers = new Headers({
      'Authorization': 'Bearer ' + accessToken,
      'responseType': 'blob',
      'Content-Type': 'application/json'
    });
    const options: RequestOptions = new RequestOptions({ headers: headers, responseType: ResponseContentType.Blob });
    const body = JSON.stringify(this.currentQuery);
    // const body = '"{}"';
    const url = `${this._url}/ExportPatients`;
    this._http.post(url, body, options)
      // .map(res => new Blob([res._body],{ type: 'application/vnd.ms-excel' }));
      .subscribe((data: any) => {
        const blob = data._body;
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'Patients.csv';
        document.body.appendChild(a);
        a.click();
        // const dataUrl = window.URL.createObjectURL(data._body, {});
        // const link = document.createElement('a');
        // link.href = dataUrl;
        // link.download = 'ExportedPatients.xlsx';
        // link.click();
        // window.URL.revokeObjectURL(url);
      });
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
