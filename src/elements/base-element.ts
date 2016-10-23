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
        return +$(".visualizer").width()
    }

    get height(): number  {
        return +$(".visualizer").height()
    }

}
