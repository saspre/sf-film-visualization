
import *  as mocha from 'mocha'; 

import * as _expect from 'expect';
const expect = _expect as any as typeof _expect.default;

describe('root', function () {
  it('renders without problems', function () {
      var root = "d";
    expect(root).toExist();
  });
});