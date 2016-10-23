import * as d3 from 'd3';
import * as $ from "jquery";

export class BaseElement {

   constructor (protected svg: d3.Selection<any>) { }

    get cx(): number {
        return this.width / 2;
    }

    get cy(): number {
        return this.height / 2;
    }

    get width(): number {
     console.log(window.innerWidth || document.body.clientWidth, $("svg").width())
        return +$("svg").width()
    }

    get height(): number  {
     console.log(window.innerHeight || document.body.clientHeight, $("svg").height())
        
        return +$("svg").height()
    }

}
