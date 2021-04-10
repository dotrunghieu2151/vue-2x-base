export const omit = (obj, ...props) => {
  return props.reduce((accumulate, prop) => {
    /* eslint-disable no-unused-vars */
    const { [prop]: omit, ...rest } = accumulate;
    return rest;
  }, obj)
}

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

export const deepClone = (obj) => {
  if (!isObject(obj)) {
    return obj;
  }

  const temp = new obj.constructor();

  for (const [key, value] of Object.entries(obj)) {
    temp[key] = isObject(value) ? deepClone(value) : value;
  }

  return temp;
}

export const arrayToObject = (arr, cb) => {
  return arr.reduce((acc, current, index) => ({
    ...acc,
    ...cb(current, index)
  }), {});
}

export const arrayLastEle = arr => {
  return Array.isArray(arr) ? arr[arr.length - 1] : arr
}

export const isArrSubsetOf = (subset, arr) => subset.every(val => arr.includes(val));

export const round = (value, precision) => {
  const rounded = +(Math.round(+value + "e+" + precision) + "e-" + precision);
  return isNaN(rounded) ? 0 : rounded;
}

export const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const upperCamelCaseToSnakeCase = (value) => {
  return value
    .replace(/^([A-Z])/, ($1) => $1.toLowerCase())
    .replace(/([A-Z])/g, ($1) => `-${$1.toLowerCase()}`);
};

export const milliseconds = (h = 0, m = 0, s = 0) => (h * 60 * 60 + m * 60 + s) * 1000;

export const formatNumber = ({ number, precision = 0, thousand = ',', decimal = '.' }) => {
  number = number || 0
  precision = !isNaN(precision = Math.abs(precision)) ? precision : 2
  thousand = thousand == null ? '' : thousand
  decimal = decimal || '.'
  const negative = number < 0 ? '-' : ''
  let i = parseInt(number = Math.abs(+number || 0).toFixed(precision), 10) + ''
  let j = i.length
  j = j > 3 ? (j % 3) : 0

  let intPart = (j ? i.substr(0, j) + thousand : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousand);
  let decimalValue = precision ? Math.abs(number - i).toFixed(precision).slice(2) : 0;
  let decimalPart = decimalValue != 0 ? decimal + decimalValue : '';

  return negative + intPart + decimalPart;
}

export const formattedToNumber = (formattedNumb, precision) => {
  const number = +formattedNumb.replace(/[^\d.]/g, '');
  return isNaN(number) ? 0 : parseFloat(number.toFixed(precision));
}

export const compareVersion = (v1, v2, options = {}) => {
  // lexicographical means version has letters and numbers;
  // zeroExtends means we allow '1.0' === '1.0.0'
  const { lexicographical = false, zeroExtend = true } = options;
  let v1parts = v1.split('.');
  let v2parts = v2.split('.');

  function isValidPart(x) {
    return (lexicographical ? /^\d+[A-Za-z]*$/ : /^\d+$/).test(x);
  }

  if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
    return NaN;
  }

  if (zeroExtend) {
    while (v1parts.length < v2parts.length) v1parts.push("0");
    while (v2parts.length < v1parts.length) v2parts.push("0");
  }

  if (!lexicographical) {
    v1parts = v1parts.map(Number);
    v2parts = v2parts.map(Number);
  }

  for (let i = 0; i < v1parts.length; ++i) {
    if (v2parts.length == i) {
      return 1;
    }

    if (v1parts[i] == v2parts[i]) {
      continue;
    }
    else if (v1parts[i] > v2parts[i]) {
      return 1;
    }
    else {
      return -1;
    }
  }

  if (v1parts.length != v2parts.length) {
    return -1;
  }

  return 0;
}

export const compareDates = (d1, compare, d2, unit = 'milliseconds') => {
  // d1 = moment.isMoment(d1) ? d1 : moment(d1);
  // d2 = moment.isMoment(d2) ? d2 : moment(d2);
  // switch (compare) {
  //   case '>':
  //     return d1.isAfter(d2, unit);

  //   case '>=':
  //     return d1.isSameOrAfter(d2, unit);

  //   case '<=':
  //     return d1.isSameOrBefore(d2, unit);

  //   case '<':
  //     return d1.isBefore(d2, unit);

  //   case '=':
  //     return d1.isSame(d2, unit);

  //   case '!=':
  //     return !d1.isSame(d2, unit);

  //   default:
  //     throw new Error("Unsupported compare operator for dates !");
  // }
}

export const isMatchedQueryOperator = (val, queryOperators) => {
  for (const [key, value] of Object.entries(queryOperators)) {
    let passed = false;
    switch (key) {
      case '$gte':
        passed = Number(val) >= Number(value);
        break;

      case '$gt':
        passed = Number(val) > Number(value);
        break;

      case '$lt':
        passed = Number(val) < Number(value);
        break;

      case '$lte':
        passed = Number(val) <= Number(value)
        break;

      case '$ne':
        passed = val !== value
        break;

      case '$exists':
        passed = value ? val !== undefined : val === undefined
        break;

      case '$in':
        if (!Array.isArray(value)) {
          throw new Error('Query operator $in must provide an array !');
        }
        passed = value.includes(val);
        break;

      case '$nin':
        if (!Array.isArray(value)) {
          throw new Error('Query operator $in must provide an array !');
        }
        passed = !value.includes(val);
        break;


      default:
        throw new Error(`Query operator ${key} is currently not supported !`);
    }
    if (!passed) return false;
  }
  return true;
}

export const isMatchedDateQueryOperator = (val, queryOperators) => {
  const dateQuery = queryOperators['$date'];
  const compareUnit = queryOperators['$unit'] || 'milliseconds';
  if (isObject(dateQuery)) {
    for (const [key, value] of Object.entries(dateQuery)) {
      let passed = false;
      switch (key) {
        case '$gte':
          passed = compareDates(val, '>=', value, compareUnit);
          break;

        case '$gt':
          passed = compareDates(val, '>', value, compareUnit);
          break;

        case '$lt':
          passed = compareDates(val, '<', value, compareUnit);
          break;

        case '$lte':
          passed = compareDates(val, '<=', value, compareUnit);
          break;

        case '$ne':
          passed = compareDates(val, '!=', value, compareUnit);
          break;

        case '$exists':
          passed = value ? val !== undefined : val === undefined
          break;

        case '$in':
          if (!Array.isArray(value)) {
            throw new Error('Date query operator $in must provide an array !');
          }
          passed = value.some(date => compareDates(val, '=', date));
          break;

        case '$nin':
          if (!Array.isArray(value)) {
            throw new Error('Query operator $in must provide an array !');
          }
          passed = value.every(date => compareDates(val, '!=', date));
          break;


        default:
          throw new Error(`Date query operator ${key} is currently not supported !`);
      }
      if (!passed) return false;
    }
    return true;
  } else {
    return compareDates(val, '=', dateQuery, compareUnit);
  }
}

export const isObjectMatched = (obj, queryParams) => {
  for (const [key, value] of Object.entries(queryParams)) {
    let passed = false;
    if (key === '$and') {
      if (!Array.isArray(value)) {
        throw new Error('Query operator $and must be an array !');
      }
      passed = value.reduce((passedOr, queryParams) => {
        return passedOr && isObjectMatched(obj, queryParams);
      }, true)
    } else if (key === '$or') {
      if (!Array.isArray(value)) {
        throw new Error('Query operator $or must be an array !');
      }
      passed = value.reduce((passedOr, queryParams) => {
        return passedOr || isObjectMatched(obj, queryParams);
      }, false)
    } else if (!isObject(value)) {
      passed = obj?.[key] === value;
    } else {
      passed = objHasProperty(value, '$date') ?
        isMatchedDateQueryOperator(obj?.[key], value) :
        isMatchedQueryOperator(obj?.[key], value);
    }

    // break early
    if (!passed) return false;
  }
  return true;
}

export class UrlSearchQuery {
  constructor(options) {
    this.options = options
  }

  toUrlSearchParam() {
    const urlSearchParam = new URLSearchParams();
    for (const [key, value] of Object.entries(this.options)) {
      if (Array.isArray(value)) {
        value.forEach(val => {
          urlSearchParam.append(`${key}[]`, val);
        })
      } else {
        urlSearchParam.append(key, value);
      }
    }
    return urlSearchParam;
  }

  toString() {
    return this.toUrlSearchParam().toString();
  }
}

export function debounce(cb, wait, immediate) {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) cb.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) cb.apply(context, args);
  };
}