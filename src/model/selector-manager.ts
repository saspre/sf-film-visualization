
import { ISelector, ISelectorHierarchy } from './selector'

/** 
 * Any component can implement this if it wants to manage the users selection of selectors. 
 */
export interface ISelectorManager {

    setSelectors(selectors: Array<ISelectorHierarchy>): void;
    setOnSelectorsCallback(callback: (primary: ISelector, secondary: ISelector) => void): void;

} 