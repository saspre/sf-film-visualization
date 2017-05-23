import { Component, OnInit, HostBinding } from '@angular/core';
import { UIStateStore } from 'store';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-loader',
    template: ` 
    <div class="overlay" *ngIf="isLoading$ | async"> 
        <div class="loader">
            <div class="inner"></div>
        </div>
    </div>

    `,
    styleUrls: ['./loader.component.scss']
})

export class LoaderComponent implements OnInit {

    isLoading$: Observable<boolean>;

    constructor(private stateStore: UIStateStore) {}

    ngOnInit() {
        this.isLoading$ = this.stateStore.isLoading$;
    }
}
