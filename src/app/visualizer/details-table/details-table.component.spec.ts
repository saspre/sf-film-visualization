import { TestBed, inject } from '@angular/core/testing';
import { ChangeDetectorRef } from '@angular/core';
import { DetailsTableComponent } from './details-table.component';

describe('a details-table component', () => {
    let component: DetailsTableComponent;

    // register all needed dependencies
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                DetailsTableComponent,
                {provide: ChangeDetectorRef, useValue: {}}
            ]
        });
    });

    // instantiation through framework injection
    beforeEach(inject([DetailsTableComponent], (DetailsTableComponent) => {
        component = DetailsTableComponent;
    }));

    it('should have an instance', () => {
        expect(component).toBeDefined();
    });
});
