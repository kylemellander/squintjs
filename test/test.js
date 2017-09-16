/* global describe, it */
const assert = require('assert');
const {
  isDOMRect
} = require('../dist/squint.min.js');

describe('isDOMRect()', function() {
  it('returns true if element has function #getBoundingClientRect', () => {
    assert.ok(isDOMRect({ getBoundingClientRect: () => {} }));
  });
});
