import * as d3 from 'd3';

export const createTranslateToBorderTransform = (width: number, height: number): (g: d3.layout.pack.Node) => string => {
     return (d): string => {
         // The original idea was to place all elements just outside the border
         // At the location nearest to their destination
         // But placing them all in the buttom looked better.
        return 'translate(' + d.x + ',' + (height + d.r)  + ')';

     };
};
