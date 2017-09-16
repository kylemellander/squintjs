export const isDOMRect = element =>
  element && typeof element.getBoundingClientRect === 'function';
