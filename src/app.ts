

import './styles.scss'
import {Promise} from 'es6-promise';
//import {InMemoryFilmLocatioRepository} from './repositories/movie-location.repository';
import {Controller} from './visualizer'

export class App {

    init(){
    
        new Promise<string>(
            (resolve: (str: string)=>void, reject: (str: string)=>void) => {
            const a: string = "hello from Promise";
            
            resolve(a);
        }).then((b) => console.log(b))

        // var repo = new InMemoryFilmLocatioRepository();

        // repo.getGroups({ label: "title"}, { label: "location"}).then((data) => {
        //     console.log(data)

        // }) 
        
      

        new Controller().draw();


    }


}

new App().init();


