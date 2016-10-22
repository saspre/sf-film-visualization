
import *  as mocha from "mocha"; 
import * as _expect from "expect";
const expect = _expect as any as typeof _expect.default; // Unfortunately needed

import * as d3 from "d3";

import { NodeHierarchyElement } from "./index";
import { filmLocations } from "../../data/test-data";
import { groupMapperFactory } from '../utils'
import { IGroup } from '../model'

describe('NodeHierarchyElement',  () => {

    let svg: d3.Selection<any>;
    let nodes: NodeHierarchyElement;
    let data: Array<IGroup>;

    beforeEach( function () {
         svg = d3.select("body").append("svg")
            .attr("width",  500)
            .attr("height", 500)

        
        nodes = new NodeHierarchyElement(svg, {
          
        });
        let mapper = groupMapperFactory("title", "COUNT_locations")
        data = mapper(filmLocations);
    });
 
    describe('set data()', function () {
        it('should add circles to the svg', function () {
            nodes.data = data;
            expect(svg.selectAll(".node").size()).toBe(273);
        });
    })

     describe('set minimumValue()', function () {
        it('should add fewer circles once minimum is set', function () {
            nodes.minimumValue = 5   
            nodes.data = data;
            expect(svg.selectAll(".node").size()).toBe(77);
        }); 
    })

    
 
});