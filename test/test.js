/* global describe, it */
const assert = require('assert');
const {
  adjustByPercent,
  isDOMRect,
  offsetBottom,
  offsetBoundary,
  offsetTop
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

describe('offsetBoundary()', () => {
  it('returns the value of the key put in if offset is not set', () => {
    assert.equal(offsetBoundary({ key: 'value' }, 'key'), 'value');
  });

  it('returns the value plus the offset if it is an integer', () => {
    assert.equal(offsetBoundary({ key: 10 }, 'key', 10), 20);
  });

  it('returns the value plus the offset if it is a number as a string', () => {
    assert.equal(offsetBoundary({ key: 10 }, 'key', '10'), 20);
  });

  it('returns value plus percent of the height if % string is sent in', () => {
    assert.equal(offsetBoundary({ key: 10, height: 10 }, 'key', '10%'), 11);
  });

  describe('with modifier of -1', () => {
    it('returns value minus the offset', () => {
      assert.equal(offsetBoundary({ key: 10 }, 'key', '10', -1), 0);
    });

    it('returns value minus percent of the height if % string given', () => {
      const result = offsetBoundary({ key: 10, height: 10 }, 'key', '10%', -1);

      assert.equal(result, 9);
    });
  });
});

describe('offsetBottom()', () => {
  it('returns the value of bottom if offset is not defined', () => {
    assert.equal(offsetBottom({ bottom: 10 }), 10);
  });

  it('returns bottom minus offset if offset is an integer', () => {
    assert.equal(offsetBottom({ bottom: 10 }, 10), 0);
  });

  it('returns bottom minus offset if offset is integer as string', () => {
    assert.equal(offsetBottom({ bottom: 10 }, '10'), 0);
  });

  it('returns bottom minus percent of height if offset a percent', () => {
    assert.equal(offsetBottom({ bottom: 10, height: 10 }, '10%'), 9);
  });
});

describe('offsetTop()', () => {
  it('returns the value of top if offset is not defined', () => {
    assert.equal(offsetTop({ top: 10 }), 10);
  });

  it('returns top minus offset if offset is an integer', () => {
    assert.equal(offsetTop({ top: 10 }, 10), 20);
  });

  it('returns top minus offset if offset is integer as string', () => {
    assert.equal(offsetTop({ top: 10 }, '10'), 20);
  });

  it('returns top minus percent of height if offset a percent', () => {
    assert.equal(offsetTop({ top: 10, height: 10 }, '10%'), 11);
  });
});
