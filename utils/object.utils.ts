export const shallowEqual = (
  obj1: Record<string, any>,
  obj2: Record<string, any>
): boolean =>
  Object.keys(obj1).length === Object.keys(obj2).length &&
  Object.keys(obj1).every((key) => obj1[key] === obj2[key]);
