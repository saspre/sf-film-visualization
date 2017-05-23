import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UIStateStore, MessageType } from 'store';

/**
 * Generic service to log messages set on the state store.
 * Current implementation only logs to the console.
 */
@Injectable()
export class LoggerService {

    constructor(private uiStateStore: UIStateStore) {

        this.uiStateStore.messages$.subscribe((message) => {
            switch (message.type) {
                case MessageType.ERROR:
                    console.error(message.message);
                    break;
                case MessageType.WARNING:
                    console.warn(message.message);
                    break;
                case MessageType.INFO:
                    console.log(message.message);
                    break;
            }
        });
    }

}
