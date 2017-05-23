import { Component, OnInit } from '@angular/core';

import {
    SelectorStore, ISelected
} from 'store';

import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-menu',
    templateUrl: 'menu.component.html',
    styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {

    primarySelectors$: Observable<string[]>;
    secondarySelectors$: Observable<string[]>;
    selected$: Observable<ISelected>;

    constructor(private selectorService: SelectorStore) {

    }

    async ngOnInit() {
        this.primarySelectors$ = this.selectorService.primarySelectors$;
        this.secondarySelectors$ = this.selectorService.secondarySelectors$;
        this.selected$ = this.selectorService.selected$;
    }

     onPrimarySelected($event) {
         this.selectorService.setPrimarySelector($event);
     }

     onSecondarySelected($event) {
         this.selectorService.setSecondarySelector($event);
     }
}
