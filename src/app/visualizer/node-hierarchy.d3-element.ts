import * as d3 from 'd3';
import { createTranslateToBorderTransform, shortenToWithinRadius } from './utils';

export interface IConfig {

    /**
     * Defines the minimumValue to be drawn.
     */
    minimumValue?: number;

    /**
     * Defines the limit for when the minimumValue should be ignored.
     */
    ignoreMinimumBelow?: number;

    /**
     * Callback for node events
     */
    callback?: (any) => any;
}

/**
 * Represent a node or bubble as data.
 */
export interface DataPoint {
    name?: string;
    value?: number;
}

/**
 * A combined interface for IGroup and d3.layout.pack.Node
 * Once we add the IGroup to pack layout it will extend the objects and add the
 * d3 properties (r, x, y...) while keeping the original properties (name, value)
 */
export interface Node extends DataPoint, d3.layout.pack.Node { }

/**
 * The node Hierarchy represents a hierarchy of nodes.
 * The depth of the hierarchy is always one.
 */
export class NodeHierarchyElement {

    /**
     * The data used to display the bubbles
     */
    private _data: Array<DataPoint>;

    private _svg: d3.Selection<any>;

    private _nodes: d3.Selection<any>;

    private _height: number;

    private _width: number;

    private _callback: (any) => any;

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
        return this._config.minimumValue || 1;
    }

    /**
     * Get ignoreMinimumBelow from config or get default
     * The ignore minium below is used to define when minimum value should be ignored.
     * If minimum value hidded most elements then we ignore it and show those below as well.
     */
    public get ignoreMinimumBelow() {
        return this._config.ignoreMinimumBelow || 20;
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
    public set data(data: Array<DataPoint>) {
        this._data = data;
    }

    private get width(): number {
        return this._width || this._element.offsetWidth;
    }

    private get height(): number {
        return this._height || this._element.offsetHeight;
    }

    private get callback(): (any) => void {
        return this._callback || this._config.callback;
    }

    constructor(
        private _element: any,
        private _config: IConfig
    ) { }




    public setDimensions(dimensions: { height: number, width: number }) {
        if (this._height === dimensions.height && this._width === dimensions.width) {
            return;
        }
        this._height = dimensions.height;
        this._width = dimensions.width;
    }


    /**
     * Remove all nodes
     */
    public clean() {
        // Ideally should the nodes be transitioned out
        if (this._svg) {
            this._svg.remove();
        }
        if (this._nodes) {
            this._nodes.remove();
        }
    }


    /**
     * Draw the nodes on the SVG.
     */
    public redraw = (animateIn = true) => {
        this.clean();

        if (!this._data || this._data.length === 0) {
            return;
        }
        this.createSvg();
        this.addNodes();
        this.addTitleToNodes();
        this.addCircleToNodes();
        this.addLabelToNodes();
        this.addOnClickListenerToNodes();

        if (animateIn) {
            this.translateNodesToCenter();
        } else {
            this.setNodesInCenter();
        }
    }


    public setCallback(callback: (any) => void) {
        this._callback = callback;
        // The callback is also added to the nodes
        if (this._nodes) {
            this.addOnClickListenerToNodes();
        }
    }


    public hide() {
        d3.selectAll('svg').remove();
    }


    private createSvg() {
        this._svg = d3.select(this._element)
            .append('svg')
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('viewBox', `0 0 ${this.width} ${this.height}`);
    }


    private getFilteredData() {
        // Find the minimum value (account for ignore minimum)
        const minimumValue = this._data.length < this._config.ignoreMinimumBelow ? 1 : this._config.minimumValue;

        // We filter the low ones and the one without name from
        return this._data.filter((d) => d.value >= minimumValue && d.name);

    }


    private addOnClickListenerToNodes() {
        const callback = this.callback;
        if (!callback) {
            return;
        }
        this._nodes.on('click', (event) => {
            if (callback) {
                callback(event);
            }
        });
    }


    private createPack() {
        return d3.layout.pack<Node>()
            .sort((a, b) => - a.name.length - b.name.length)
            .size([this.width, this.height])
            .padding(10);
    }


    private addNodes() {

        const data = this.getFilteredData();
        const pack = this.createPack();

        // Create the translate to border function
        const translateNodeToBorder = createTranslateToBorderTransform(this.width, this.height);

        // Pack nodes and remove the root node as the hierarchical nature is removed.
        const layoutNodes = pack.nodes({ children: data }).filter((d) => !d.children);

        this._nodes = this._svg
            .selectAll('.node')
            .data(layoutNodes)
            .enter().append('g')
            .attr('class', 'node')
            .attr('transform', translateNodeToBorder);
    }


    private setNodesInCenter() {
        // All nodes start in the buttom (or where ever the translateToBorder method takes them)
        // Then they get 'translated' into their correct postion
        this._nodes.attr('transform', (d) => {
            return `translate(${d.x}, ${d.y})`;
        });
    }


    private translateNodesToCenter() {
        // All nodes start in the buttom (or where ever the translateToBorder method takes them)
        // Then they get 'translated' into their correct postion
        this._nodes.transition()
            .duration(1800)
            .ease('cubic-in-out')
            .delay((d, i) => 800 * Math.random()) // It looks better if they start at different times
            .attr('transform', (d) => {
                return `translate(${d.x}, ${d.y})`;
            });
    }


    private addCircleToNodes() {
        this._nodes.append('circle')
            .attr('r', (d) => d.r)
            // We add 6 different classes to the nodes.
            // D3 also has a color scheme scale, but i prefer colors to be defined in CSS.
            .attr('class', (d, i) => 'node-color-' + ((i % 6) + 1));
    }


    /**
     * Adds a title to show when hovering the mouse.
     */
    private addTitleToNodes() {
        this._nodes.append('title')
            .text((d: DataPoint) => d.name + ': ' + d.value);
    }


    private addLabelToNodes() {

        // A foreignOject is added here instead of just using SVG text.
        // SVG text does not support word wrap in any clean way atleast.
        // Using foreignObject div and p's can be inserted
        // and CSS can ensure the are placed properly.
        this._nodes.append('foreignObject')
            .attr('width', (d) => d.r * 2)
            .attr('height', (d) => d.r * 2)
            .attr('transform', (d) => `translate(${-d.r},${-d.r})`)
            .append('xhtml:div')
            .append('xhtml:p')
            .html((d: any) => shortenToWithinRadius(d.r, d.name));
    }
}
