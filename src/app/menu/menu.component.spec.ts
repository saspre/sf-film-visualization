import { TestBed, inject } from '@angular/core/testing';

import {
    MenuComponent,
    SelectorListComponent

} from './index';

import {ConvertSelectorPipe } from 'shared';

import { SelectorStore } from 'store';

describe('a menu component', () => {
    let component: MenuComponent;

    // register all needed dependencies
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                MenuComponent,
                SelectorListComponent,
                ConvertSelectorPipe
            ],
            providers: [
                SelectorStore
            ]
        }).compileComponents();
    });

    // instantiation through framework injection
    beforeEach(() => {
        component = TestBed.createComponent(MenuComponent).componentInstance;
    });

    it('should have an instance', () => {
        expect(component).toBeDefined();
    });
});
