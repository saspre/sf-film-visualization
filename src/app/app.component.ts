import { Component, HostListener } from '@angular/core';
import { UIStateStore } from 'store';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(private stateStore: UIStateStore) { }

    @HostListener('click', ['$event'])
    public onClick($event) {
        this.stateStore.clearMessages();
    }
}
