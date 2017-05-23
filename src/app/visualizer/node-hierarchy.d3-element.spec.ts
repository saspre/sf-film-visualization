

import * as d3 from 'd3';

import { NodeHierarchyElement, DataPoint } from './index';

const testData: DataPoint[] = [{
    'value': 17,
    'name': 'Americana'
  },
  {
    'value': 14,
    'name': 'The Game'
  },
  {
    'value': 6,
    'name': 'My Reality'
  }];

describe('NodeHierarchyElement', () => {

    let nodes: NodeHierarchyElement;
    const data: Array<any> = [];

    beforeEach(function () {

        nodes = new NodeHierarchyElement(document.body, {});
       d3.selectAll('.node').remove();

    });

    describe('set data()', function () {
        it('should add circles to the svg', function () {

            nodes.ignoreMinimumBelow = 500;
            nodes.minimumValue = 0;
            nodes.data = testData;
            nodes.redraw();
            expect(d3.selectAll('.node').size()).toBe(3);
        });
    });

    describe('set minimumValue()', function () {
        it('should add fewer circles once minimum is set', function () {
            nodes.minimumValue = 10;
            nodes.ignoreMinimumBelow = 1;
            nodes.data = testData;
            nodes.redraw();
            expect(d3.selectAll('.node').size()).toBe(2);
        });
    });
});
