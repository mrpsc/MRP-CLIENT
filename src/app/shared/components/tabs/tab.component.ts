import { TabsComponent } from './tabs.component';
import { Component, Input } from '@angular/core';
import { Output } from '@angular/core/src/metadata/directives';
import { EventEmitter } from 'selenium-webdriver';

@Component({
  selector: 'tab',
  styles: ['.pane{ padding: 1em; }'],
  template: `
    <div [hidden]="!active" class="pane">
      <ng-content></ng-content>
    </div>
  `
})
export class TabComponent {
  @Input('tabTitle') title: string;
  @Input() active = false;

  constructor(tabs:TabsComponent) {
    tabs.addTab(this);
  }
}