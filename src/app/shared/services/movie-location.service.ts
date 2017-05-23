import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { SelectorStore, UIStateStore, ISelected } from 'store';

/**
 * Represent a node or bubble as data.
 */
export interface IGroup {
    name?: string;
    value?: number;
}

/**
 * The InMemoryFilmLocation repository fetches the entire data set up front and stores it in memory.
 * For smaller data sets this is sufficient, but for larger it is not
 */
@Injectable()
export class MovieLocationService {

    private url = 'https://data.sfgov.org/resource/wwmu-gmzc.json';

    private _groups: BehaviorSubject<IGroup[]> = new BehaviorSubject([]);
    private _details: BehaviorSubject<any[]> = new BehaviorSubject([]);

    /**
     * To get the movie location data as groups this should be subscribed to.
     */
    get groups$() {
        return this._groups.asObservable();
    }

    /**
     * To get detailed data, this should be subscribed to
     */
    get details$() {
        return this._details.asObservable();
    }

    constructor(
        private http: Http,
        private selectorStore: SelectorStore,
        private uiStateStore: UIStateStore) {
        this.selectorStore.selected$.subscribe(this.onNewSelector);
    }


    private onNewSelector = async (selected: ISelected) => {
        this.uiStateStore.setIsLoading(true);
        try {
            await this.getData(selected);
        } catch (e) {
            this.uiStateStore.setError('Could not fetch data');
            this.uiStateStore.setDebug(e);
        } finally {
            this.uiStateStore.setIsLoading(false);
        }
    }


    private async getData(selected: ISelected) {
        if (selected.tertiary) {
            const details = await this.getDetails(selected.primary,
                selected.secondary,
                selected.tertiary);
            this._details.next(details);
        } else {
            const groups = await this.getGroups(selected.primary, selected.secondary);
            this._details.next([]);
            this._groups.next(groups);
        }
    }


    private getGroups(primary: string, secondary: string): Promise<Array<IGroup>> {

        // If neither selector is the location we need a more advanced query as we would other wise get
        // very misleading results (or simply plain wrong results)
        // e.g. if primary = production_company and secondary = writer it will show the number of locations
        // that production company has used that writer not based on number of films
        if (primary !== 'locations' && secondary !== 'locations') {
            return this.getAvancedGroups(primary, secondary);
        }

        const url = this.getSimpleQueryUrl(primary, secondary);

        return this.http.get(url)
            .catch(this.handleError)
            .map(data => data.json())
            .map(this.createGroupMapper(primary, 'COUNT_' + secondary))
            .toPromise();
    }


    private getSimpleQueryUrl(primary: string, secondary: string) {
        return `${this.url}?$group=${primary}&$select=${primary},COUNT(${secondary})`;
    }


    /**
     * Converts error messages from http as good as possible.
     */
    private handleError = (error: Response | any) => {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body['error'] || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Promise.reject(errMsg);
    }


    private getDetails(primary, secondary, tertiary) {

        const url = this.getDetailsQuery(primary, secondary, tertiary);

        return this.http.get(url)
            .catch(this.handleError)
            .map(data => data.json())
            .toPromise();
    }


    private getDetailsQuery(primary, secondary, tertiary) {
        const keys = this.getLocationFilteredKeys(primary, secondary);
        return `${this.url}?${primary}=${tertiary}&$group=${keys}&$select=${keys}`;
    }


    /**
     * Filters away location unless location is either primary or secondary
     */
    private getLocationFilteredKeys(primary: string, secondary: string) {

        return Array.from(this.selectorStore.getSelectorHiearchy().keys()).filter((key) => {
            return key !== 'locations' ||  secondary === 'locations' || primary === 'locations';
        });
    }


    private getAvancedGroups(primary: string, secondary: string): Promise<Array<IGroup>> {
        const mapper = this.createGroupMapper(primary, 'count');

        const query = this.getAdvancedQuery(primary, secondary);

        return this.http.get(`${this.url}?$query=${query}`)
            .catch(this.handleError)
            .map(data => data.json())
            .map(mapper)
            .toPromise();
    }


    private getAdvancedQuery(primary: string, secondary: string) {
        return `SELECT ${primary}, count(*) 
                     GROUP BY ${secondary}, ${primary} |>
                            SELECT ${primary}, COUNT(*) AS count 
                            GROUP BY ${primary}`;
    }


    /**
     * Can map data from the repository to correct format based on the labels.
     */
    private createGroupMapper(nameLabel: string, valueLabel: string):
        (elements: Array<any>) => Array<IGroup> {

        return (elements): Array<IGroup> => {
            if (!elements) {
                return null;
            }
            return elements.map((elem: any) => {
                return {
                    name: elem[nameLabel],
                    value: +elem[valueLabel]
                };
            });
        };
    }
}



