import { TestBed, inject } from '@angular/core/testing';

import { ConvertSelectorPipe } from './convert-selector.pipe';

describe('a ConvertSelectorPipe component', () => {
    let component: ConvertSelectorPipe;


    // instantiation through framework injection
    beforeEach(() => {
        component = new ConvertSelectorPipe();
    });

    it('should have an instance', () => {
        expect(component).toBeDefined();

    });

    const assertEqual = (actual: string, expected: string) => {
        expect(component.transform(actual)).toBe(expected);
    };

    it('should capitalize and replace _ with space', () => {
        assertEqual('the_big_brown_fox', 'The Big Brown Fox');
        assertEqual('thefox', 'Thefox');
        assertEqual('_a', ' A');
    });

    it('should return empty string if given empty string', () => {
        assertEqual('', '');
        assertEqual('false', 'False');
        assertEqual(null, '');
    });
});
