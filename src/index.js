export const adjustByPercent = (bounds, key, percent) => {
  const height = bounds.bottom - bounds.top;
  const adjustmentValue = height * percent / 100;
  
  return bounds[key] + adjustmentValue;
}

export const isDOMRect = element =>
  element && typeof element.getBoundingClientRect === 'function';
