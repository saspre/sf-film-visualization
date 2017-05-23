import { TestBed, inject, async } from '@angular/core/testing';

import { SelectorStore } from './selector.store';

describe('The selector store', () => {
    let store: SelectorStore;

    // register all needed dependencies
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                SelectorStore
            ]
        });
    });

    // instantiation through framework injection
    beforeEach(inject([SelectorStore], (SelectorStore) => {
        store = SelectorStore;
    }));

    it('should have an instance', () => {
        expect(store).toBeDefined();
    });

    describe('SetPrimarySelector', () => {

        it('should push a new selector', async(() => {
            store.setPrimarySelector('writer');
            store.selected$.subscribe((result) => {
                 expect(result.primary).toBe('writer');
                 expect(result.secondary).toBe('title');
            });
        }));

        it('should push a new set of secondary selector', async(() => {
            store.setPrimarySelector('locations');
            store.secondarySelectors$.subscribe((result) => {
                 expect(result[0]).toBe('title');
            });
        }));

        it('should throw error if invalid selector chosen', async(() => {
            expect(() => store.setPrimarySelector('invalid')).toThrowError();

        }));
    });

     describe('SetSecondarySelector', () => {

        it('should push a new selector', async(() => {
            store.setPrimarySelector('director'); // We set a different director as default only has one possible secondary selector

            store.setSecondarySelector('writer');
            store.selected$.subscribe((result) => {
                 expect(result.primary).toBe('director');
                 expect(result.secondary).toBe('writer');
            });
        }));

        it('should throw error if secondary selector is not in the set of selectors', async(() => {
            expect(() => store.setSecondarySelector('writer')).toThrowError();
        }));

    });
});
