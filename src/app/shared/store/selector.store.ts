import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export interface ISelected {
    primary: string;
    secondary: string;
    tertiary?: string;
}


@Injectable()
export class SelectorStore {


    get selected$() {
        return this._selected.asObservable();
    }

    get primarySelectors$(): Observable<string[]> {
        return this._primarySelectors.asObservable();
    }

    get secondarySelectors$(): Observable<string[]> {
        return this._secondarySelectors.asObservable();
    }

    private _primarySelectors: BehaviorSubject<string[]> = new BehaviorSubject([]);

    private _secondarySelectors: BehaviorSubject<string[]> = new BehaviorSubject([]);

    private _selected: BehaviorSubject<ISelected> = new BehaviorSubject({ primary: '', secondary: '' });

    private _selectorHiearchy: Map<string, string[]>;


    constructor() {

        this._selectorHiearchy = this.getSelectorHiearchy();
        this.inializeSelectors();
    }

    private inializeSelectors() {
        const primarySelectors = Array.from(this._selectorHiearchy.keys());
        this._primarySelectors.next(primarySelectors);

        const secondarySelectors = this._selectorHiearchy.get(primarySelectors[0]);
        this._selected.next({ primary: primarySelectors[0], secondary: secondarySelectors[0] });

         this.selected$.subscribe((selector) => {
            const selectors = this._selectorHiearchy.get(selector.primary);
            this._secondarySelectors.next(selectors);
        });
    }

    public setPrimarySelector(selected: string) {
        const newSecondarySelectors = this._selectorHiearchy.get(selected);
        if (!newSecondarySelectors) {
            throw new Error(`Invalid selector chosen. Value was <${selected}> possible values are: <${this._primarySelectors.getValue()}>`);
        }
        this._selected.next({ primary: selected, secondary: newSecondarySelectors[0] });
        this._secondarySelectors.next(newSecondarySelectors);
    }

    public setSecondarySelector(selected: string) {
        const primary = this._selected.getValue().primary;
        if (!this._selectorHiearchy.get(primary).includes(selected))  {
            throw new Error(`Invalid selector. Value was <${selected}> possible values are: <${this._selectorHiearchy.get(primary)}>`);
        }
        this._selected.next({ primary: primary, secondary: selected });
    }

    public setTertiarySelector(selected: string) {
        const { primary, secondary } = this._selected.getValue();

        this._selected.next({ primary: primary, secondary: secondary, tertiary: selected });
    }


    /**
     * Gets the possible selectors.
     * These are hardcoded for now, but should preferably be fetched from the API
     */
    public getSelectorHiearchy(): Map<string, string[]> {
        const titleSelector = 'title';
        const locationsSelector = 'locations';
        const writerSelector = 'writer';
        const directorSelector = 'director';
        const productionCompany = 'production_company';


        const hierarchy = new Map<string, string[]>();
        hierarchy.set(titleSelector, [locationsSelector]);
        hierarchy.set(locationsSelector, [titleSelector]);
        hierarchy.set(writerSelector, [titleSelector, locationsSelector, directorSelector, productionCompany]);
        hierarchy.set(directorSelector, [titleSelector, locationsSelector, writerSelector, productionCompany]);
        hierarchy.set(productionCompany, [titleSelector, locationsSelector, writerSelector, directorSelector]);

        return hierarchy;

    }
}
