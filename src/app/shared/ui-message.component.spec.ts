

import { TestBed, inject, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';

import { Subject } from 'rxjs/Subject';
import { By } from '@angular/platform-browser';

import {
    UIMessageComponent,
} from './index';

import { UIStateStore, ILogMessage, MessageType } from 'store';

const mockSubject = new Subject<ILogMessage>();

/**
 * Create a mock store that allows us to inject messages
 */
const mockStore = {
    messages$: mockSubject.asObservable()
};


describe('a selector list component', () => {
    let component: UIMessageComponent;
    let fixture: ComponentFixture<UIMessageComponent>;

    // register all needed dependencies
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                UIMessageComponent,
            ],
            providers: [
                { provide: UIStateStore, useValue: mockStore },
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]

        }).compileComponents();
    });

    // instantiation through framework injection
    beforeEach(() => {
        fixture = TestBed.createComponent(UIMessageComponent);
        component = fixture.componentInstance;

    });

    it('should have an instance', () => {
        expect(component).toBeDefined();
    });

    it('should not show a message initaially', () => {
        const element = fixture.debugElement.query(By.css('span'));
        expect(element).toBe(null);
    });

    it('should show a message when a error is pushed', () => {
        const testMessage = 'test message';
        mockSubject.next({
            type: MessageType.ERROR, message: testMessage
        });

        fixture.detectChanges();

        const element = fixture.debugElement.query(By.css('span'));
        expect(element.nativeElement.innerHTML).toBe(testMessage);
    });

    it('should ensure the message has the error class', () => {
        const testMessage = 'test message';
        mockSubject.next({
            type: MessageType.ERROR, message: testMessage
        });
        fixture.detectChanges();
        const element = fixture.debugElement.query(By.css('.error'));
        expect(element).toBeDefined();
    });
});
