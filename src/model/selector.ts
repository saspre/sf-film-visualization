

interface ISelector {
    label?: string; 
    query: string;
}

interface ISelectorHierarchy extends ISelector {
    children: Array<ISelector>
}

export { ISelector, ISelectorHierarchy }