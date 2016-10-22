

import * as d3 from 'd3';


export const translateToBorderFactory = (cx: number, cy: number): (g:d3.layout.pack.Node) => string => {


     return (d): string => {

        
        // let xCenterDistance = (d.x - cx)
        // let yCenterDistance = (d.y - cy)

        // let closetsXBorder = xCenterDistance < 0? 0 : this.width;
        // let closetsYBorder = yCenterDistance < 0? 0 : this.height;

        return "translate(" + (d.x - cx) * 100 + "," + (d.y - cy) * 100 + ")";

     }
} 