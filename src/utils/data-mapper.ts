
import { IGroup } from '../model'

export const groupMapperFactory = <T>(nameLabel: string, valueLabel:string): 
        (elements: Array<T>) => Array<IGroup> => {
    
    return (elements ): Array<IGroup> => {
        return elements.map((elem:any) => {   
            return { 
                name: elem[nameLabel],
                value: +elem[valueLabel]
            }
        });
    }
            
}

