
import * as d3 from 'd3'
import { BaseElement } from './base-element'
import { IVisualizerConfig } from '../visualizer-config'

import * as logManager from 'loglevel'
let log = logManager.getLogger("loader");


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

    constructor(
        private _svg: d3.Selection<any>,
        config: IVisualizerConfig
    ) {
        super(config);
    }

    startLoader() {
        if (this.g) {
            log.debug("Trying to start an already started loader")
            return; // We ignore call if already loading.
        }
        this.g = this._svg.append("g")
            .classed("loader", true);

        this.addCircle(this.g);
        this.addRect(this.g);

    }

    stopLoader() {
        if (this.g) {
            this.g.remove();
            this.g = null;
        }
    }

    /**
     * Adds a circle to the selection. The circle is placed in the center of the board.
     *  */
    private addCircle(selection: d3.Selection<any>) {
        selection.append("circle")
            .attr("cx", () => this.cx)
            .attr("cy", () => this.cy)
            .attr("r", this.r)
    }

    /**
     * Adds a rect that should rotate
     *  */
    private addRect(selection: d3.Selection<any>) {
        const height = this.r * 2 + 5  // *2 = diameter. +5 to account for the circles border.
        const width = 20; // Defines the width of the gap in the circle
        const rect = selection.append("rect")
            .attr("x", () => this.cx - 20 / 2)
            .attr("y", () => this.cy - height / 2)
            .attr("width", width)
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
                .each("end", transistion); // Repeat transition
        }

        transistion();
    }
}
