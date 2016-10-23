
import *  as mocha from 'mocha'; 
import * as _expect from 'expect';
const expect = _expect as any as typeof _expect.default; // Unfortunately needed
import {StandardLoader, ILoader} from "./loader";

import * as d3 from 'd3';

describe('StandardLoader',  () => {

    let svg: d3.Selection<any>;
    let loader: ILoader;

    beforeEach( function () {
         svg = d3.select("body").append("svg")
            .attr("width",  500)
            .attr("height", 500)
        loader = new StandardLoader(svg, { });
    });
 
    describe('startLoading()', function () {
        it('Should add a loader to the svg', function () {
            loader.startLoader();
            expect(svg.select("g").classed("loader")).toBe(true);
        });
 
    })

      describe('stopLoading()', function () {
        it('Should stop an started loader', function () {
            loader.startLoader();
            loader.stopLoader();
            expect(svg.select("g").empty).toBeTruthy();
        });

    })
 
});