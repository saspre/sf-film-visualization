
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { MovieLocationService, LoggerService} from 'services';
import { SelectorStore, UIStateStore } from 'store';
import { LoaderComponent, UIMessageComponent, ConvertSelectorPipe } from './index';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';

@NgModule({
  declarations: [
     LoaderComponent,
     UIMessageComponent,
     ConvertSelectorPipe
  ],
  exports: [
     LoaderComponent,
     UIMessageComponent,
     ConvertSelectorPipe
  ],
  imports: [
    HttpModule,
    CommonModule
  ],
  providers: [
    MovieLocationService,
    SelectorStore,
    UIStateStore,
    LoggerService


  ]
})
export class SharedModule { }
