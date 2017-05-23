
import { Component, OnInit, HostBinding, ChangeDetectorRef } from '@angular/core';
import { UIStateStore, MessageType } from 'store';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-ui-message',
    template: ` 
  
	<div class="ui-message-bar" [ngClass]="typeClass" *ngIf="message.length > 0">
		<span>{{message}}</span>
	</div>

	`,
    styleUrls: ['./ui-message.component.scss']
})

export class UIMessageComponent implements OnInit {

    private static DISPLAY_MESSAGES = [
        MessageType.CLEAR,
        MessageType.INFO,
        MessageType.ERROR,
        MessageType.WARNING,
    ];

    message = '';
    type = MessageType.CLEAR;

    get typeClass() {
        return MessageType[this.type].toLowerCase();
    }

    constructor(private stateStore: UIStateStore) {

    }

    ngOnInit() {
        this.stateStore.messages$
            .filter((message) => {
                return UIMessageComponent.DISPLAY_MESSAGES.includes(message.type);
            })
            .subscribe((message) => {

                this.message = message.message;
                this.type = message.type;
            });
    }
}
