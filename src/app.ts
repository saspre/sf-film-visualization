

import './static/fonts/Sansumi-Regular.scss'
import './styles.scss'

import { MenuComponent, Visualizer } from './components'
import * as log from 'loglevel'
 
log.setLevel("debug")

export class App {
    private _visualizer: Visualizer;

    constructor( ){
        this._visualizer = new Visualizer(new MenuComponent(), { });
    }

    init(){
        this._visualizer.draw();
    }
}

const app = new App();

app.init();


