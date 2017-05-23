import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from 'shared';
import { VisualizerModule } from 'app/visualizer';
import { MenuModule } from './menu';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    SharedModule,
    MenuModule,
    VisualizerModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
