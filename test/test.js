/* global describe, it */
const assert = require('assert');
const {
  adjustByPercent,
  isDOMRect
} = require('../dist/squint.min.js');

describe('isDOMRect()', () => {
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

describe('adjustByPercent()', () => {
  it('returns the bounds if percent is 0', () => {
    assert.equal(adjustByPercent({ key: 10, height: 10 }, 'key'), 10);
  });

  it('returns the bounds plus the percentage', () => {
    assert.equal(adjustByPercent({ key: 10, height: 10 }, 'key', 10), 11);
  });

  it('returns the bounds minus the percentage if percent is negative', () => {
    assert.equal(adjustByPercent({ key: 10, height: 10 }, 'key', -10), 9);
  });
});
