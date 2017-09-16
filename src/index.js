export const adjustByPercent = (bounds, key, percent = 0) => {
  const adjustmentValue = bounds.height * percent / 100;

  return bounds[key] + adjustmentValue;
}

export const isDOMRect = element =>
  element && typeof element.getBoundingClientRect === 'function';
