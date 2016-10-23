
/**
 * Defines a selector to get data from.
 */
interface ISelector {
    /**
     * The string to display to the user 
     * It is optional as it is not necessary to send to the repository.
     */
    label?: string; 

    /**
     * The query param must match with the data from the backend (repository)
     */
    query: string;
}

/** 
 * For nesting selectors. 
 * If a parent is selected only the selectors in the children can be used in conjuction. 
 */
interface ISelectorHierarchy extends ISelector {
    children: Array<ISelector>
}

export { ISelector, ISelectorHierarchy }