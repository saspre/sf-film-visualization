
import * as d3 from 'd3'
import { BaseElement } from './base-element' 

export interface ILoader {
    startLoader(): void;
    stopLoader(): void;
}


export class StandardLoader extends BaseElement implements ILoader {

    /**
     * Radius of the loader
     */
    private r = 50;
    private g: d3.Selection<any>;

    constructor (svg: d3.Selection<any>) { 
        super(svg);
    }

 

    startLoader() {
        if(this.g) {
            // todo: loging
            return; // We ignore call if already loading.
        }
        this.g = this.svg.append("g")
            .classed("fv-loader", true);

        this.addCircle(this.g);
        this.addRect(this.g);

    }

    stopLoader() {
        if(this.g) 
        
            this.g.remove();
    }

    /// Adds a circle to the selection. The circle is placed in the center of the board.
    private addCircle(selection: d3.Selection<any>) {
         selection.append("circle")
            .attr("cx", () => this.cx)
            .attr("cy", () => this.cy)
            .attr("r", this.r)
    }

    private addRect(selection: d3.Selection<any>) {
        const height = this.r * 2 + 5  // *2 = diameter. +5 to account for the circles border.
        const width = 20; // Defines the width of the gap in the circle
        const rect = selection.append("rect")
            .attr("x", () => this.cx - 20 / 2)
            .attr("y", () => this.cy - height / 2 )
            .attr("width", 20)
            .attr("height", height);
        
        this.addRotation(rect);
    }

    private addRotation(selection: d3.Selection<any>) {
        const transistion = () => {
            selection.transition()
            .attrTween("transform", 
                () => d3.interpolateString(`rotate(0,   ${this.cx}, ${this.cy})`,
                                        `rotate(360, ${this.cx}, ${this.cy})`))
            .duration(2000)
            .each("end",  transistion); // Repeat transition
        }

        transistion();
    }
}
