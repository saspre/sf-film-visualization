import * as d3 from 'd3';


export class BaseElement {

   constructor (protected svg: d3.Selection<any>) { }

    get cx(): number {
        return this.width / 2;
    }

    get cy(): number {
        return this.height / 2;
    }

    get width(): number {
        return +this.svg.attr("width")
    }

    get height(): number  {
        return +this.svg.attr("height")
    }

}
