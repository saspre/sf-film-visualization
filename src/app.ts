

import '../fonts/Sansumi-Regular.scss'
import './styles.scss'

//import {InMemoryFilmLocatioRepository} from './repositories/movie-location.repository';
import {Controller} from './visualizer'
import * as logManager from 'loglevel'
 
let log = logManager.getLogger("app");

log.setLevel("debug")


export class App {

    init(){
    
        new Promise<string>(
            (resolve: (str: string)=>void, reject: (str: string)=>void) => {
            const a: string = "hello from Promise";
            
            resolve(a);
        }).then((b) => log.info(b))

        // var repo = new InMemoryFilmLocatioRepository();

        // repo.getGroups({ label: "title"}, { label: "location"}).then((data) => {
        //     console.log(data)

        // }) 
        
      

        new Controller().draw();


    }


}

new App().init();


