

import './static/fonts/Sansumi-Regular.scss'
import './styles.scss'

//import {InMemoryFilmLocatioRepository} from './repositories/movie-location.repository';
import { Visualizer } from './visualizer'
import { MenuComponent } from './components'
import * as logManager from 'loglevel'
 
let log = logManager.getLogger("app");

log.setLevel("debug")


export class App {
    private _visualizer: Visualizer;

    constructor( ){
        this._visualizer = new Visualizer(new MenuComponent());
    }

    init(){
        this._visualizer.draw();
    }


}

const app = new App();

app.init();


