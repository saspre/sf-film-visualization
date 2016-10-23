
import { ISelector, ISelectorManager, ISelectorHierarchy } from '../../model'

import * as $ from 'jquery'

const primarySelector = "primary-selectors";
const secondarySelector = "secondary-selectors";

import * as logManager from 'loglevel'
let log = logManager.getLogger("menu");


interface IDictionary {
    [index: string]: string;
}

export class MenuComponent implements ISelectorManager {

    private _selectorsHierarchy: Array<ISelectorHierarchy>;
    private _callback: (primary: ISelector, secondary: ISelector) => void;

    private _selected: IDictionary = {} as IDictionary;

    setSelectors(selectors: Array<ISelectorHierarchy>) {
        let selectedPrimary = selectors[0].query;
        let selectedSecondary = selectors[0].children[0].query;


        this.setSelectorsInternal(primarySelector, selectors, selectedPrimary);
        this.setSelectorsInternal(secondarySelector, selectors[0].children, selectedSecondary);

        this._selectorsHierarchy = selectors;
    }

    setOnSelectorsCallback(callback: (primary: ISelector, secondary: ISelector) => void): void {
        this._callback = callback;
    }


    private setSelectorsInternal(category: string, selectors: Array<ISelector>, selected?: string) {
        this._selected[category] = selected;
        let categoryClass = `.${category}`
        $(categoryClass).empty();

        selectors.forEach((selector, i) => {
            let selectedString = selected === selector.query ? "checked" : "";
            const html = `
                <input type="radio" name="${category}" id="${category}-${i}" value="${selector.query}" ${selectedString} />
                <label for="${category}-${i}">${selector.label}<label><br>
            `
            $(categoryClass).append(html)
        });

       this.addChangeListener(category); 
    }

    private addChangeListener(category: string) {
         let categoryClass = `.${category}`
         $(categoryClass + ' input').on("change", (event: JQueryEventObject) => {
            
            let selectedValue = $(`input[name="${category}"]:checked`, categoryClass).val();
            
            this._selected[category] = selectedValue

            if (category === primarySelector) {
                let selected = this._selectorsHierarchy.find((s) => s.query === selectedValue)
                this.setSelectorsInternal(secondarySelector, selected.children, selected.children[0].query);
            }
            this.invokeCallback();
        })
    }


    private invokeCallback() {
        if (!this._callback) {
            log.error("Callback has not been set");
            return;
        }
        this._callback({ query: this._selected[primarySelector] }, { query: this._selected[secondarySelector] })
    }

}