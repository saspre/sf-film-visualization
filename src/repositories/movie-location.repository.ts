
import  'whatwg-fetch';


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


/**
 * The IFilmLocationRepository is used to fetch the information 
 * The idea is to create an abstraction between the data, as it can have several origins
 *  */
export interface IFilmLocationRepository {

    getGroups: (grouping: string) => Promise<Array<IFilm>>;
}

/**  
 * The InMemoryFilmLocation repository fetches the entire data set up front and stores it in memory. 
 * For smaller data sets this is sufficient, but for larger it is not
 */
export class InMemoryFilmLocatioRepository implements  IFilmLocationRepository {

    private headers = new Headers();

    getGroups(grouping): Promise<Array<IFilm>> {
        var s: ReadableStream;
       
        return fetch('https://data.sfgov.org/resource/wwmu-gmzc.json?$group=title&$select=title')
            .then((response:any)  => {
               return response.json()
        }).then((res) => {

            console.log(res)
        });
        
    }
}



