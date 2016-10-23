import * as d3 from 'd3';
import { BaseElement } from './base-element';
import { IGroup } from '../../../model';
import { translateToBorderFactory, shortenToWithinRadius } from '../../../utils';
import { IVisualizerConfig } from '../visualizer-config'

import * as logManager from 'loglevel'
let log = logManager.getLogger("node-hierarchy")


/**
 * A combined interface for IGroup and d3.layout.pack.Node
 * Once we add the IGroup to pack layout it will extend the objects and add the
 * d3 properties (r, x, y...) while keeping the original properties (name, value)
 */
export interface Node extends IGroup, d3.layout.pack.Node {}

/**
 * The node Hierarchy represents a hierarchy of nodes. 
 * The depth of the hierarchy is always one. 
 */
export class NodeHierarchyElement extends BaseElement {

    /**
     * The data used to display the bubbles
     */
    private _data: Array<IGroup>;

    constructor(
        private _svg: d3.Selection<any>,
        config: IVisualizerConfig,
    ) {
        super(config);

        if (!this._config) {
            log.error("No configuration is specified");
            return;
        }
    }

    /**
     * Setter to change config property
     */
    public set minimumValue(value: number) {
        this._config.minimumValue = value;
    }

    /**
     * Get minimumValue from config or get default
     */
    public get minimumValue() {
        return this._config.minimumValue ||  1;
    }

    /**
     * Get ignoreMinimumBelow from config or get default
     * The ignore minium below is used to define when minimum value should be ignored.
     * If minimum value hidded most elements then we ignore it and show those below as well.
     */
    public get ignoreMinimumBelow() {
        return this._config.ignoreMinimumBelow ||  20;
    }

    /**
     * Setter to change config property
     */
    public set ignoreMinimumBelow(value) {
        this._config.ignoreMinimumBelow = value;
    }


    /** 
     * Sets data and starts drawing nodedes
     *  */
    public set data(data: Array<IGroup>) {
        if (this._data) {
            this.clean();
        }
        this._data = data;
        this.redraw();
    }

    /** 
     * Remove all nodes 
     */
    public clean() {
        // Ideally should the nodes be transitioned out
        this._svg.selectAll(".node").remove();
    }

    /**
     * Draw the nodes on the SVG. 
     */
    public redraw = () => {

        // Create the translate to border function
        const translateNodeToBorder = translateToBorderFactory(this.width, this.height);

        // Find the minimum value (account for ignore minimum)
        let minimumValue = this._data.length < this._config.ignoreMinimumBelow ? 1 : this._config.minimumValue;

        // We filter the low ones and the one without name from 
        const data = this._data.filter((d) => d.value >= minimumValue && d.name)

        // Create a pack layout
        const pack = d3.layout.pack<Node>()
            .sort((a, b) => - a.name.length - b.name.length)
            .size([this.width, this.height])
            .padding(5);

        // Pack nodes and remove the root node as the hierarchical nature is removed. 
        let layoutNodes = pack.nodes({ children: data }) .filter((d) => !d.children) 

        const nodesSelection = this._svg
            .selectAll(".node")
            .data(layoutNodes)
            .enter().append("g")
            .attr("class", "node")
            .attr("transform", translateNodeToBorder);

        this.addTitle(nodesSelection);
        this.addCircle(nodesSelection);
        this.addLabel(nodesSelection);
        this.translateToCenter(nodesSelection);
    }


    private translateToCenter(nodesSelection: d3.Selection<Node>) {
        // All nodes start in the buttom (or where ever the translateToBorder method takes them)
        // Then they get 'translated' into their correct postion
        nodesSelection.transition()
            .duration(1800)
            .ease("cubic-in-out")
            .delay((d, i) => 800 * Math.random()) // It looks better if they start at different times
            .attr("transform", (d) => {
                return `translate(${d.x}, ${d.y})`;
            });
    }

    private addCircle(selection: d3.Selection<Node>) {
        selection.append("circle")
            .attr("r", (d) => d.r)
            // We add 6 different classes to the nodes. 
            // D3 also has a color scheme scale, but i prefer colors to be defined in CSS.
            .attr("class", (d, i) => "node-color-" + ((i % 6) + 1)); 


    }
     
    /**
     * Adds a title to show when hovering the mouse.
     */
    private addTitle(selection: d3.Selection<Node>) {
        selection.append("title")
            .text((d: IGroup) =>  d.name + ": " + d.value );
    }

    private addLabel(selection: d3.Selection<Node>) {

        // A foreignOject is added here instead of just using SVG text. 
        // SVG text does not support word wrap in any clean way atleast. 
        // Using foreignObject div and p's can be inserted 
        // and CSS can ensure the are placed properly. 
        selection.append("foreignObject")
            .attr("width", (d) => d.r * 2)
            .attr("height", (d) => d.r * 2)
            .attr("transform", (d) => `translate(${-d.r},${-d.r})`)
            .append("xhtml:div")
            .append("xhtml:p")
            .html((d: any) => shortenToWithinRadius(d.r, d.name));

    }

}