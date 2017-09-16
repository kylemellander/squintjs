/* global describe, it */
const assert = require('assert');
const {
  isDOMRect
} = require('../dist/squint.min.js');

describe('isDOMRect()', function() {
  it('returns true if element has function #getBoundingClientRect', () => {
    assert.ok(isDOMRect({ getBoundingClientRect: () => {} }));
  });

  it('returns falsy if element does not exist', () => {
    assert.ok(!isDOMRect());
  });

  it('returns falsy if element#getBoundingClientRect is undefined', () => {
    assert.ok(!isDOMRect({ getSomethingElse: () => {} }));
  });

  it('returns false if element#getBoundingClientRect is not a function', () => {
    assert.equal(isDOMRect({ getBoundingClientRect: 10 }), false);
  });
});
