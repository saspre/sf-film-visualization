import './styles.scss'
import './static/fonts/Sansumi-Regular.scss'

import { MenuComponent, Visualizer } from './components'
import { SodaFilmLocatioRepository } from './repositories'
import * as log from 'loglevel'
import * as $ from 'jquery'

log.setLevel("debug")

export class App {
    private _visualizer: Visualizer;

    constructor( ){
        this._visualizer = new Visualizer(
            new MenuComponent(),  
            new SodaFilmLocatioRepository(), 
            { }); // We rely on the default configuration
    }

    init(){
        $('body').fadeIn("fast");
        this._visualizer.initalize();
    }
}

const app = new App();

app.init();


