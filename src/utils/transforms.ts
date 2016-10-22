

import * as d3 from 'd3';


export const translateToBorderFactory = (width: number, height: number): (g:d3.layout.pack.Node) => string => {


     return (d): string => {

         let cx = width / 2;
         let cy = height / 2;
        
         let xCenterDistance = (d.x - cx)
         let yCenterDistance = (d.y - cy)

         let closetsXBorder = xCenterDistance < 0? 0 : width;
         let closetsYBorder = yCenterDistance < 0? 0 : height;
     
        return "translate(" + d.x + "," + (height + d.r)  + ")";

     }
} 