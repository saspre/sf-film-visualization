
import { ISelector, ISelectorManager } from '../../model'

import * as $ from 'jquery'

const primarySelector = "primary-selectors";
const secondarySelector = "secondary-selectors";

import * as logManager from 'loglevel'
let log = logManager.getLogger("menu");


interface IDictionary {
     [index: string]: string;
}

export class MenuComponent implements ISelectorManager {

    private _primarySelectors: Array<ISelector>;
    private _secondarySelectors: Array<ISelector>;
    private _callback: (primary: ISelector, secondary: ISelector) => void;

    private _selected: IDictionary = {} as IDictionary;

     setPrimarySelectors(selectors: Array<ISelector>, selected?: string){
          this.setSelectors(primarySelector, selectors, selected);
          this._selected[primarySelector] = selected;
     }

    setSecondarySelectors(selectors: Array<ISelector>, selected?: string){
          this.setSelectors(secondarySelector,  selectors, selected);
          this._selected[secondarySelector] = selected;

     }

     setOnSelectorsCallback(callback: (primary: ISelector, secondary: ISelector) => void): void {
         this._callback = callback;
     }


    private setSelectors(category: string, selectors: Array<ISelector>, selected?: string){
        
        let categoryClass = `.${category}`
        
        selectors.forEach((selector, i) => {
         
            let selectedString = selected === selector.query? "checked": "";
            const html = `
                <input type="radio" name="${category}" id="${category}-${i}" value="${selector.query}" ${selectedString} />
                <label for="${category}-${i}">${selector.label}<label><br>
            `
            $(categoryClass).append(html)

            $(categoryClass + ' input').on("change", (event: JQueryEventObject) => {
                let selectedValue =$(`input[name="${category}"]:checked`, categoryClass).val();
                console.log($(`input[name="${category}"]:checked`, categoryClass).val(), category)
                this._selected[category] = selectedValue
                this.invokeCallback();
            })
        });
    }

    private invokeCallback() {
        if(!this._callback) {
            log.error("Callback has not been set");
            return;
        }
        this._callback({query: this._selected[primarySelector]}, {query: this._selected[secondarySelector]})
    }

}