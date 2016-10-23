
import  'whatwg-fetch';
import { IGroup, ISelector, ISelectorHierarchy, IGroupRepository } from '../model'
import * as logManager from 'loglevel'
import { groupMapperFactory } from '../utils' 
let log = logManager.getLogger("movie-location-repo");
import * as $ from 'jquery'


/**  
 * The InMemoryFilmLocation repository fetches the entire data set up front and stores it in memory. 
 * For smaller data sets this is sufficient, but for larger it is not
 */
export class SodaFilmLocatioRepository implements  IGroupRepository {

    private headers = new Headers();
    private url = 'https://data.sfgov.org/resource/wwmu-gmzc.json'
   
    getGroups(primary: ISelector, secondary:ISelector): Promise<Array<IGroup>> {
         

        // A mapper is created. It converts the result from the api to an array of IGroup
        const mapper = groupMapperFactory(primary.query, "COUNT_" + secondary.query);

        // If neither selector is the location we need a more advanced query as we would other wise get 
        // very misleading results (or simply plain wrong results)
        // e.g. if primary = production_company and secondary = writer it will show the number of locations 
        // that production company has used that writer not based on number of films 
        if(primary.query !== "locations" && secondary.query !== "locations") 
        {
            return this.getAvancedGroups(primary, secondary);
        }

        return this.fetch(`${this.url}?$group=${primary.query}&$select=${primary.query},COUNT(${secondary.query})`)           
            .then(mapper)
    }

    
    private getAvancedGroups(primary: ISelector, secondary:ISelector): Promise<Array<IGroup>>  {
        const mapper = groupMapperFactory(primary.query, "count");

        let query = `SELECT ${primary.query}, count(*) 
                     GROUP BY ${secondary.query}, ${primary.query} |>
                            SELECT ${primary.query}, COUNT(*) AS count 
                            GROUP BY ${primary.query}`
        

        return this.fetch(`${this.url}?$query=${query}`)
            .then(mapper);
    }

    private fetch(query: string): Promise<any> {
        return fetch(query)
            .then((response:any)  => response.json())
    }

    /**
     * Gets the possible selectors. 
     * These are hardcoded for now, but should preferably be fetched from the API
     */
    getSelectors(): Promise<Array<ISelectorHierarchy>> {
        const titleSelector = {
                    label: "Movie",
                    query: "title"
                };
        const locationsSelector = {
                    label: "Locations",
                    query: "locations"
                };
        const writerSelector = {
                    label: "Writer",
                    query: "writer"
                };
        const directorSelector = {
                    label: "Director",
                    query: "director"
                };
        const productionCompany = {
                    label: "Production Company",
                    query: "production_company"
                }
        

        return new Promise<Array<ISelectorHierarchy>>((resolve, reject) => {
            let data = [
                $.extend(titleSelector,     { children: [ locationsSelector  ]}),
                $.extend(locationsSelector, { children: [ titleSelector   ]}),
                $.extend(writerSelector,    { children: [ titleSelector, locationsSelector, directorSelector, productionCompany  ]}),
                $.extend(directorSelector,  { children: [ titleSelector, locationsSelector, writerSelector, productionCompany  ]}),
                $.extend(productionCompany, { children: [ titleSelector, locationsSelector, writerSelector, directorSelector  ]}),
            ]
            resolve(data);
        })
    }


  
}



