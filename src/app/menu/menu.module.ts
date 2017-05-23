
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Observable } from 'rxjs/Observable';


import {
  MenuComponent,
  SelectorListComponent,
} from './';

import { SharedModule } from 'shared';
import { VisualizerComponent } from 'app/visualizer';


@NgModule({
  declarations: [
    MenuComponent,
    SelectorListComponent,
  ],
  imports: [ CommonModule, SharedModule ],
  exports: [MenuComponent],
  providers: []
})
export class MenuModule { }
