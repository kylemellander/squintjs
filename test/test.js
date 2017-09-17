/* global describe, it */
const assert = require('assert');
const {
  adjustByPercent,
  findScrollTo,
  isDOMRect,
  offsetBottom,
  offsetBoundary,
  offsetTop
} = require('../src/index.js');

const mockElement = (options = {}) => ({
  offsetTop: options.offsetTop || 0,
  contains: () => options.contains !== false,
  getBoundingClientRect: () => Object.assign({
    top: 10,
    bottom: 20,
    height: 10,
  }, options)
});

describe('findScrollTo()', () => {
  it('returns false if element is not valid', () => {
    assert.equal(findScrollTo(undefined, mockElement()), false);
  });

  it('returns false if container is not valid', () => {
    const element = mockElement();

    assert.equal(findScrollTo(element, undefined), false);
  });

  describe('top of element is above the top of the container', () => {
    it('returns the position at which the element needs to scroll to', () => {
      const result = findScrollTo(
        mockElement({ offsetTop: 20 }),
        mockElement({ top: 20, offsetTop: 10 })
      );

      assert.equal(result, 10);
    });
  });

  describe('bottom of element is below the bottom of the container', () => {
    it('returns the position at which the element needs to scroll to', () => {
      const result = findScrollTo(
        mockElement({ bottom: 120, offsetTop: 100 }),
        mockElement({ bottom: 110, height: 100 })
      );

      assert.equal(result, 10);
    });
  });

  it ('returns false if element is within bounds of container', () => {
    const result = findScrollTo(
      mockElement({ top: 20, bottom: 30 }),
      mockElement({ top: 10, bottom: 40 })
    );

    assert.equal(result, false);
  });

  it ('returns false if element is not a descendent of container', () => {
    const result = findScrollTo(
      mockElement({ offsetTop: 20 }),
      mockElement({ top: 20, offsetTop: 10, contains: false })
    );

    assert.equal(result, false);
  });
});

describe('isDOMRect()', () => {
  it('returns true if element has function #getBoundingClientRect', () => {
    assert.ok(isDOMRect(mockElement()));
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
