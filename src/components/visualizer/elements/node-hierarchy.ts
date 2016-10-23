import * as d3 from 'd3';
import { BaseElement } from './base-element';
import { IGroup } from '../../../model';
import { translateToBorderFactory, shortenToWithinRadius } from '../../../utils';
import * as logManager from 'loglevel'

let log = logManager.getLogger("node-hierarchy")


/**
 * A combined interface for IGroup and d3.layout.pack.Node
 * Once we add the IGroup to pack layout it will extend the objects and add the
 * d3 properties (r, x, y...) while keeping the original properties (name, value)
 */
export interface Node extends IGroup, d3.layout.pack.Node {
    radius?: number;
}

export class NodeHierarchyElementOption {

    /**
     * Defines the minimumValue to be drawn
     */
    minimumValue?: number;  
}

/**
 * The node Hierarchy represents a hierarchy of nodes. 
 * The depth of the hierarchy is always one. 
 */
export class NodeHierarchyElement extends BaseElement {

    private _colorScheme: d3.scale.Ordinal<string, string>;
    private _data: Array<IGroup>;

    constructor(
            svg: d3.Selection<any>, 
            private _config: NodeHierarchyElementOption) {
        super (svg);

        if(!this._config) {
            log.error("No configuration is specified");
            return;
        }
    }

    /** 
     * The default colorscheme can be overriden
    */
    public set colorScheme(value: d3.scale.Ordinal<string, string>) {
        this._colorScheme = value;
    }

    public set minimumValue(value: number) {
        this._config.minimumValue = value;
    }

    public get minimumValue() {
        return this._config.minimumValue || 0;
    }

    public get colorScheme(): d3.scale.Ordinal<string, string> {
        if(!this._colorScheme) {
            this._colorScheme = d3.scale.category20c();
         }
         return this._colorScheme;
 

    }

    /** 
     * Sets data and starts drawing nodedes
     *  */
    public set data(data: Array<IGroup>) {
        if(this._data) {
            this.clean();
        }
        this._data = data;
        this.redraw();
    }

    public clean() {
        this.svg.selectAll(".node") .remove();
    }

    public redraw() {
        const translateNodeToBorder = translateToBorderFactory(this.width, this.height);
       
        const data = this._data.filter((d) => d.value >= this.minimumValue && d.name)
        

         const pack = d3.layout.pack<Node>()
                .sort((a,b)=> {
                    return  - a.name.length - b.name.length
                    // var threshold = 10;
                    // if ((a.value > threshold) && (b.value > threshold)) {
                    //     return (a.value - b.value);
                    // } else {
                    //     return 1;
                    // }
                })
                .size([this.width, this.height])
                .padding(5);

        let layoutNodes = pack.nodes({children: data})
            .filter((d) =>  !d.children ) // Remove the root node as the hierarchical nature is removed. 
        
         layoutNodes.forEach((d) => d.radius = d.r);
        

        const nodesSelection = this.svg
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


        nodesSelection.transition()
            .duration(2000)
            .ease("cubic-in-out")
            .delay((d, i) => i * 20 * Math.random())
            .attr("transform", (d) => { 
                return `translate(${d.x}, ${d.y})`; 
            });
      }

    private addCircle(selection: d3.Selection<Node>) {
         selection.append("circle")
            .attr("r", (d) => d.r )
            .attr("class", (d,i ) => "node-color-" + ((i % 6 )+ 1));
        
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