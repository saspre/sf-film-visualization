
import  'whatwg-fetch';
import { IGroup } from '../model'
import * as logManager from 'loglevel'
import { groupMapperFactory } from '../utils' 
let log = logManager.getLogger("movie-location-repo");


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
         
        // A mapper is created. It converts the result from the api to an array of IGroup
        const mapper = groupMapperFactory(primary.label, "COUNT_" + secondary.label);

        return fetch(`${this.url}?$group=${primary.label}&$select=${primary.label},COUNT(${secondary.label})`)
            .then((response:any)  => response.json())
            .then(mapper)
    }

    getSelectors(): Promise<Array<ISelector>> {
        return null;
    }


  
}



