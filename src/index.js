export default function scrollIntoView(element, container, options = {}) {
  const position = findScrollTo(element, container, options);

  if (typeof position === 'number') {
    animateScrolling(container, position, options.duration || 500);
  }

  return element;
}

export const findScrollTo = (element, container, options = {}) => {
  if (!isDOMRect(element) || !isDOMRect(container)) {
    return false;
  }

  if (!container.contains(element)) {
    return false;
  }

  const { top, bottom, height } = element.getBoundingClientRect();
  const containerBounds = container.getBoundingClientRect();
  const containerTop = offsetTop(containerBounds, options.offset);
  const containerBottom = offsetBottom(containerBounds, options.offset);

  if (top < containerTop) {
    const relativeTop = element.offsetTop - container.offsetTop;
    const padding = containerBounds.top - containerTop;

    return relativeTop + padding;
  }

  if (bottom > containerBottom) {
    const relativeTop = element.offsetTop - container.offsetTop;
    const relativeBottom = relativeTop - containerBounds.height + height;
    const padding = containerBounds.bottom - containerBottom;

    return relativeBottom + padding;
  }

  return false;
}

export const animateScrolling = (container, position, duration) => {
  const cosParam = (container.scrollTop - position) / 2;
  let scrollCount = 0;
  let oldTimestamp = performance.now();

  const nextFrame = newTimestamp => {
    scrollCount += Math.PI / (duration / (newTimestamp - oldTimestamp));
    if (scrollCount >= Math.PI) {
      container.scrollTop = position;
      return;
    }

    const distanceTravelled = cosParam + cosParam * Math.cos(scrollCount);
    container.scrollTop = position + distanceTravelled;
    oldTimestamp = newTimestamp;
    window.requestAnimationFrame(nextFrame);
  }

  window.requestAnimationFrame(nextFrame);
}

export const offsetTop = (bounds, offset) =>
  offsetBoundary(bounds, 'top', offset);

export const offsetBottom = (bounds, offset) =>
  offsetBoundary(bounds, 'bottom', offset, -1);

export const offsetBoundary = (bounds, key, offset, modifier = 1) => {
  if (!offset) {
    return bounds[key];
  }

  if (typeof offset === 'number' || offset.slice(-1) !== '%') {
     return bounds[key] + (parseInt(offset) * modifier);
  }

  return adjustByPercent(bounds, key, parseInt(offset.slice(0, -1)) * modifier);
}

export const adjustByPercent = (bounds, key, percent = 0) => {
  const adjustmentValue = bounds.height * percent / 100;

  return bounds[key] + adjustmentValue;
}

export const isDOMRect = element =>
  element && typeof element.getBoundingClientRect === 'function';
