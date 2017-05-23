import { TestBed, inject, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SelectorListComponent } from './index';
import {
    ConvertSelectorPipe
 } from 'shared';

describe('a selector list component', () => {
    let component: SelectorListComponent;
    let fixture: ComponentFixture<SelectorListComponent>;

    // register all needed dependencies
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                SelectorListComponent,
                ConvertSelectorPipe
            ],
        }).compileComponents();
    });

    // instantiation through framework injection
    beforeEach(() => {
        fixture = TestBed.createComponent(SelectorListComponent);
        component = fixture.componentInstance;
        component.selectors = [
            'selector1',
            'selector2'
        ];
    });

    it('should have an instance', () => {
        expect(component).toBeDefined();
    });

    it('should populate the list of inputs', () => {
        const childNodes = fixture.debugElement.childNodes;
        expect(childNodes.length).toBe(component.selectors.length);
    });

    it('should emit event when selector clicked', async(() => {
        component.selected = 'selector2';
        fixture.detectChanges();
        const debug = fixture.debugElement.query(By.css('input[value=selector2]'));
        let selectedSelector = null;
        component.onSelected.subscribe((selector) => {
            selectedSelector = selector;
        });

        debug.triggerEventHandler('click', null);

        expect(selectedSelector).toBe('selector2');
    }));
});
