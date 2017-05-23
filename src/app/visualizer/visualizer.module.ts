import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { VisualizerComponent, DetailsTableComponent } from './';
import { MovieLocationService } from 'services';
import { SelectorStore } from 'store';
import { SharedModule } from 'shared';

@NgModule({
  declarations: [
    VisualizerComponent,
    DetailsTableComponent
  ],
  imports: [ CommonModule, SharedModule, BrowserAnimationsModule ],
  exports: [VisualizerComponent],
  providers: []
})
export class VisualizerModule { }
