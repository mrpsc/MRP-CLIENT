import { Component, ContentChildren, QueryList, forwardRef, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
// import { TabComponent } from './tab.component';

@Component({
  selector: 'tabs',
  styles: [' li{ cursor: pointer; }'],
  template:`
    <ul class="nav nav-tabs">
      <li *ngFor="let tab of tabs" (click)="selectTab(tab)" [ngClass]="{'active': tab === activeTab}">
        <a>{{tab[displayKey]}}</a>
      </li>
    </ul>
    <ng-content></ng-content>
   `
})
export class TabsComponent implements OnChanges {
  @Input() tabs: any[];
  @Input() displayKey: string;
  @Input() valueKey: string;

  @Output() onSelectTab = new EventEmitter<any>();

  activeTab: any = null;

  ngOnChanges(changes: SimpleChanges) {
    if (changes["tabs"] && changes["tabs"].currentValue && 
    changes["tabs"].currentValue !== changes["tabs"].previousValue && 
    changes["tabs"].currentValue.length > 0) {
      this.activeTab = this.tabs[0];
    }
  }
 
  selectTab(tab){
    this.activeTab = tab;

    this.onSelectTab.emit(tab[this.valueKey]);
  }

}
