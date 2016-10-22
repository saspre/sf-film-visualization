import * as d3 from 'd3';


export class BaseElement {

   constructor (protected svg: d3.Selection<any>) { }

    get cx(): number {
        return +this.svg.attr("width") / 2;
    }

    get cy(): number {
        return +this.svg.attr("height") / 2;
    }


}
