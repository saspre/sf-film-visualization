
import { ISelector, ISelectorManager, ISelectorHierarchy } from '../../model'

import * as $ from 'jquery'

const primarySelector = "primary-selectors";
const secondarySelector = "secondary-selectors";

import * as logManager from 'loglevel'
let log = logManager.getLogger("menu");

/** 
 * Interface representing a dictionary
 */
interface IDictionary {
    [index: string]: string;
}

/**
 * The menu component shows radio buttons.
 * It implements the ISelector interface.
 */
export class MenuComponent implements ISelectorManager {

    /**
     * Hierarchy describing the possible selections the user can make
     */
    private _selectorsHierarchy: Array<ISelectorHierarchy>;

    /**
     * Callback when a selection is made. 
     */
    private _callback: (primary: ISelector, secondary: ISelector) => void;

    /**
     * Dictionary for selected selectors. 
     */
    private _selected: IDictionary = {} as IDictionary;

    /**
     * Sets selectors. 
     * Typescript selectors are not used as they also require a getter when used in interfaces. 
     */
    setSelectors(selectors: Array<ISelectorHierarchy>) {
        let selectedPrimary = selectors[0].query;
        let selectedSecondary = selectors[0].children[0].query;


        this.setSelectorsInternal(primarySelector, selectors, selectedPrimary);
        this.setSelectorsInternal(secondarySelector, selectors[0].children, selectedSecondary);

        this._selectorsHierarchy = selectors;
    }

    /** 
     * Adds Callback
     * @param {(primary: ISelector, secondary: ISelector) => void} callback
     */
    setOnSelectorsCallback(callback: (primary: ISelector, secondary: ISelector) => void): void {
        this._callback = callback;
    }

    /** 
     * Internal method for adding the selectors  
     * @param {string} category Catory is either: secondary-selector or primary-selector
     * */
    private setSelectorsInternal(category: string, selectors: Array<ISelector>, selected?: string) {
        this._selected[category] = selected;
        let categoryClass = `.${category}`
        $(categoryClass).empty();

        // As I started out deI cided only to use D3.
        // But adding the following seems out of place using D3. 
        // As i didn't have much time i decided to go with jQuery. 
        // The following code represents why many people, including my self loath jQuery. 
        // This could be made very clean and simple in frameworks such as AngularJS. 

        selectors.forEach((selector, i) => {
            let selectedString = selected === selector.query ? "checked" : "";
            const html = `
                <input type="radio" name="${category}" id="${category}-${i}" value="${selector.query}" ${selectedString} />
                <label for="${category}-${i}">${selector.label}</label><br>
            `
            $(categoryClass).append(html)
        });

        this.addChangeListener(category);
    }

    /**
     * 
     *  @param {string} category Catory is either: secondary-selector or primary-selector
     */
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
        this._callback(
            { query: this._selected[primarySelector] }, 
            { query: this._selected[secondarySelector] })
    }

}