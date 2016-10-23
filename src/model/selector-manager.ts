
import { ISelector } from './selector'


export interface ISelectorManager {

    setPrimarySelectors(selectors: Array<ISelector>, selected: string): void;
    setSecondarySelectors(selectors: Array<ISelector>, selected: string): void;
    setOnSelectorsCallback(callback: (primary: ISelector, secondary: ISelector) => void): void;

} 