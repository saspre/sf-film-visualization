import './styles.scss'
import './static/fonts/Sansumi-Regular.scss'

import { MenuComponent, Visualizer } from './components'
import { SodaFilmLocatioRepository } from './repositories'
import * as log from 'loglevel'
import * as $ from 'jquery'

log.setLevel("debug")

/**
 * Main application. 
 * This class bootstraps the entire app.
 */
export class App {
    private _visualizer: Visualizer;

    constructor( ){
        this._visualizer = new Visualizer(
            new MenuComponent(),  
            new SodaFilmLocatioRepository(), 
            { minimumValue: 2 }); 
    }

    init(){
        // Litte fix to make start look better
        $('body').fadeIn("fast");
        this._visualizer.initalize();
    }
}

const app = new App();

app.init();


