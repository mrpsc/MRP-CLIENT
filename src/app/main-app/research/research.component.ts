import { Component, OnInit } from '@angular/core';
import { ResearchModel } from "./researchModel";
import { Router } from '@angular/router';
import { ResearchService } from "../../shared/services/research.service";


@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.css']
})
export class ResearchComponent implements OnInit {
  queries: Array<ResearchModel>;


  constructor(private _ResearchService: ResearchService,  private router: Router){
  }


  ngOnInit() {
    // this.queries = this._ResearchService.getQueries();
    // console.log(this.queries);
  }

  // showPatients (index:number){
  //   this._ResearchService.setCurrentQuery(this.queries[index]);
  //   this.router.navigate(['./patientsResult']);
  // }

  // deleteQuery (index:number){
  //   let message = this._ResearchService.deleteQuery(index);
  //   this.ngOnInit();
  //   alert(message);
  // }

  // editQuery (index : number){
  //   this.router.navigate(['./buildQuery']);
  // }

  // buildNewQuery (){
  //   this.router.navigate(['./buildQuery']);
  // }


}
