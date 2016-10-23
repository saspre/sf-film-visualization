
import { ISelector, ISelectorHierarchy } from './selector'


export interface ISelectorManager {

    setSelectors(selectors: Array<ISelectorHierarchy>): void;
    setOnSelectorsCallback(callback: (primary: ISelector, secondary: ISelector) => void): void;

} 