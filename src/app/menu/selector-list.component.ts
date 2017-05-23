import { Component, Input, Output, EventEmitter } from '@angular/core';



@Component({
    selector: 'app-selector-list',
    template: `
        <div *ngFor="let selector of selectors let i = index; ">
          <input
            type="radio" 
            name="{{category}}" 
            id="{{category}}-{{i}}" 
            value="{{selector}}" 
            [checked]="selector === selected"
            (click)="onSelected.emit(selector)"> 
          <label for="{{category}}-{{i}}">{{selector | convertSelector}}</label>
        </div>`,
    styles: [`
        div {
            padding-top: 5px;
        }
    `]
})

export class SelectorListComponent {

    @Input() category: string;
    @Input() selectors: any;
    @Input() selected: string;
    @Output('onSelected') onSelected = new EventEmitter<string>();
}
