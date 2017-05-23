
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export enum MessageType {
    CLEAR, ERROR, WARNING, INFO, DEBUG
}

export interface ILogMessage {
    type: MessageType;
    message: string;
}

const clearMessage = {type: MessageType.CLEAR, message: '' };

@Injectable()
export class UIStateStore {


    private _isLoading = new BehaviorSubject<boolean>(true);

    private _messages = new Subject<ILogMessage>();

    public get isLoading$() {
        return this._isLoading.asObservable();
    }

    public get messages$() {
        return this._messages.asObservable();
    }

    public setIsLoading(value: boolean) {
        this._isLoading.next(value);
    }

    public clearMessages() {
        this._messages.next(clearMessage);
    }

    public setError(message) {
        this._messages.next({ type: MessageType.ERROR , message: message});
    }

    public setWarning(message) {
        this._messages.next({ type: MessageType.WARNING , message: message});
    }

    public setInfo(message) {
        this._messages.next({ type: MessageType.INFO , message: message});
    }

    public setDebug(message) {
        this._messages.next({ type: MessageType.DEBUG , message: message});
    }
}
