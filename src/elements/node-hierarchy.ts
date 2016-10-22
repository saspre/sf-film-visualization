import * as d3 from 'd3';
import { BaseElement } from './base-element';
import { IGroup } from '../model';
import { translateToBorderFactory, shortenToWithinRadius } from '../utils';
import * as logManager from 'loglevel'

let log = logManager.getLogger("node-hierarchy")


/**
 * A combined interface for IGroup and d3.layout.pack.Node
 * Once we add the IGroup to pack layout it will extend the objects and add the
 * d3 properties (r, x, y...) while keeping the original properties (name, value)
 */
export interface Node extends IGroup, d3.layout.pack.Node {

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
        this._data = data;
        this.redraw();
    }

    public redraw() {
        const translateNodeToBorder = translateToBorderFactory(this.width, this.height);
       
        const data = this._data.filter((d) => d.value >= this.minimumValue && d.name)
     
         const pack = d3.layout.pack()
                .sort((a: any, b: any) => b["name"] - a["name"])
                .size([this.width, this.height])
                .padding(5);

        const layoutNodes = pack.nodes({children: data})
            .filter((d) =>  !d.children ) // Remove the root node as the hierarchical nature is removed. 
        
        

        const nodesSelection = this.svg
            .selectAll(".node") 
            .data(layoutNodes)
            .enter().append("g")
            .attr("class", "node")
            .attr("transform", translateNodeToBorder);

        this.addTitle(nodesSelection);
      
        this.addCircle(nodesSelection);
        this.addLabel(nodesSelection);
      
        // let collide =  (alpha:any) =>{
        //     var quadtree = d3.geom.quadtree(layoutNodes);
        //     return (d: Node) => {
        //         var r = d.r ,
        //             nx1 = d.x - r,
        //             nx2 = d.x + r,
        //             ny1 = d.y - r,
        //             ny2 = d.y + r;
        //         quadtree.visit((quad, x1, y1, x2, y2)  => {
        //         if (quad.point && (quad.point !== d)) {
        //             var x = d.x - quad.point.x,
        //                 y = d.y - quad.point.y,
        //                 l = Math.sqrt(x * x + y * y),
        //                 r = d.r + quad.point.r ;
        //             if (l < r) {
        //             l = (l - r) / l * alpha;
        //             d.x -= x *= l;
        //             d.y -= y *= l;
        //             quad.point.x += x;
        //             quad.point.y += y;
        //             }
        //         }
        //         return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
        //         });
        //     };
        //     }

        //  let tick = (e: any) => {
        //         nodesSelection
        //  //   .each(cluster(10 * e.alpha * e.alpha))
        //  //   .each(collide(.1))
        //     .attr("cx", (d)  =>{  return d.x = Math.max(50, Math.min(this.width - 50, d.x)); })
        //     .attr("cy", (d) => { return d.y = Math.max(50, Math.min(this.height - 50, d.y)); });
        // }

        // var force = d3.layout.force()
        // .nodes(layoutNodes)
        // .size([this.width, this.height])
        // .gravity(.1)
        // .charge(0)
        // .on("tick", tick)
        // .start();

       this.translateToCenter(nodesSelection);
    }

    private translateToCenter(nodesSelection: d3.Selection<Node>) {


        nodesSelection.transition()
            .duration(2000)
            .ease("cubic-in-out")
            .delay((d, i) => i * 20 * Math.random())
            .attr("transform", (d) => { 
                var diffX = d.x - this.cx;
                var diffY = d.y - this.cy;
                d.x = d.x + diffX;
                return "translate(" + (d.x) + "," + (d.y) + ")"; 
            });
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