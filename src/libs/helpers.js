export const isNotNullOrNumber = val => {
  return Boolean(val) || val === 0;
}

export const isFunction = v => typeof (v) === 'function'

export const isString = v => typeof (v) === 'string'

export const isObject = v => typeof v === 'object' && v !== null

export const toNumber = v => Number(v);

export const isObjectEmpty = v => isObject(v) && Object.keys(v).length === 0

export const isEmpty = v =>
  !v ||
  (Array.isArray(v) && v.length === 0) ||
  (isObject(v) && Object.keys(v).length === 0);

export const deepEqual = (x, y) => {
  const keys = Object.keys;
  const typeX = typeof x;
  const typeY = typeof y;
  return x && y && typeX === 'object' && typeX === typeY ?
    (
      keys(x).length === keys(y).length &&
      keys(x).every(key => deepEqual(x[key], y[key]))
    ) :
    (x === y);
}

export const objHasProperty = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);

export const immutable = (val) => {
  if (isObject(val)) {
    return Object.freeze(val);
  } else if (isFunction(val)) {
    return immutable(val());
  } else {
    return Object.freeze({ current: val });
  }
}

export const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};
