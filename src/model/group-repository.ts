import { ISelector, ISelectorHierarchy } from './selector'
import { IGroup } from './group'

/**
 * The IGroupRepository is used to fetch groups 
 * The idea is to create an abstraction between the data, as it can have several origins
 *  */
export interface IGroupRepository {

    getGroups(primary: ISelector, secondary: ISelector): Promise<Array<IGroup>>;
    getSelectors(): Promise<Array<ISelectorHierarchy>>;
}
