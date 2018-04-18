import { Component, OnInit } from '@angular/core';
import { ResearchModel } from './researchModel';
import { Router } from '@angular/router';
import { ResearchService } from '../../shared/services/research.service';

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.css']
})
export class ResearchComponent {
  queries: Array<ResearchModel>;

  constructor() { }
}
