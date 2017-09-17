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
