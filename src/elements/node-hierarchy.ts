import * as d3 from 'd3';
import { BaseElement } from './base-element';
import { IGroup } from '../model';
import { translateToBorderFactory, shortenToWithinRadius } from '../utils';

/**
 * A combined interface for IGroup and d3.layout.pack.Node
 * Once we add the IGroup to pack layout it will extend the objects and add the
 * d3 properties (r, x, y...) while keeping the original properties (name, value)
 */
export interface Node extends IGroup, d3.layout.pack.Node {

}

/**
 * The node Hierarchy represents a hierarchy of nodes. 
 * The depth of the hierarchy is always one. 
 */
export class NodeHierarchyElement extends BaseElement {

    private _colorScheme: d3.scale.Ordinal<string, string>;

    constructor(
            svg: d3.Selection<any>, 
            private packLayout: d3.layout.Pack<Node>) {
        super (svg);
    }

    public set colorScheme(value: d3.scale.Ordinal<string, string>) {
        this._colorScheme = value;
    }

    public get colorScheme(): d3.scale.Ordinal<string, string> {
        if(!this._colorScheme) {
            this._colorScheme = d3.scale.category20b();
        }
        return this._colorScheme;
    }

    public setData(data: Array<IGroup>) {
         
        const translateNodeToBorder = translateToBorderFactory(this.cx, this.cy);
       
        const layoutNodes = this.packLayout.nodes({children: data})
            .filter((d) =>  !d.children ) // Remove the root node as the hierarchical nature is removed. 
       
        const nodesSelection = this.svg
            .selectAll(".node") 
            .data(layoutNodes)
            .enter().append("g")
            .attr("class", "node")
            .attr("transform", translateNodeToBorder);

        this.addTitle(nodesSelection);
        this.addLabel(nodesSelection);
        this.addCircle(nodesSelection);
        this.translateToCenter(nodesSelection);
    
    }

    private translateToCenter(nodesSelection: d3.Selection<Node>) {
        nodesSelection.transition()
            .duration(3000)
            .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
    }

    private addCircle(selection: d3.Selection<Node>) {
         selection.append("circle")
            .attr("r", (d) => d.r )
            .style("fill", (d) => this.colorScheme(d.name));
    }

    private addTitle(selection: d3.Selection<Node>) {
        selection.append("title")
            .text((d: IGroup) => { return d.name + ": " + d.value; });
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