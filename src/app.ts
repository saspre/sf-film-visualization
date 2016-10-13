
import {select} from 'd3-selection'
import './styles.scss'

export class Visualizer {

    init(){
        select("body").append("p").text("Test 2");
    }


}

new Visualizer().init();