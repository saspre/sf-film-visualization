
import  'whatwg-fetch';
import { IGroup } from '../model'

export interface IFilm {
    title: string;
    releaseYear: string;
    locations: string;
    funFacts: string;
    productionCompany: string; 
    distributer: string;
    director: string; 
    writer: string;
    actors: Array<string>;
}



export interface ISelector {
    label: string; 
}

/**
 * The IFilmLocationRepository is used to fetch the information 
 * The idea is to create an abstraction between the data, as it can have several origins
 *  */
export interface IFilmLocationRepository {

    getGroups(primary: ISelector, secondary: ISelector): Promise<Array<IGroup>>;
    getSelectors(): Promise<Array<ISelector>>;
}

/**  
 * The InMemoryFilmLocation repository fetches the entire data set up front and stores it in memory. 
 * For smaller data sets this is sufficient, but for larger it is not
 */
export class SodaFilmLocatioRepository implements  IFilmLocationRepository {

    private headers = new Headers();
    private url = 'https://data.sfgov.org/resource/wwmu-gmzc.json'
   
    getGroups(primary: ISelector, secondary:ISelector): Promise<Array<IGroup>> {
      
        return fetch(`${this.url}?$group=${primary.label}&$select=${primary.label},COUNT(${secondary.label})`)
            .then((response:any)  => response.json())
            .then((json: any): Array<IGroup> => {
                return json.map((elem:any) => { 
                    console.log(elem)
                    return { 
                        name: elem[primary.label],
                        value: +elem["COUNT_" + secondary.label]
                    }
                })
            })
    }

    getSelectors(): Promise<Array<ISelector>> {
        return null;
    }


  
}



