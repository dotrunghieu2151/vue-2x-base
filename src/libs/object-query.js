import moment from "moment";

export const compareDates = (d1, compare, d2, unit = 'milliseconds') => {
  d1 = moment.isMoment(d1) ? d1 : moment(d1);
  d2 = moment.isMoment(d2) ? d2 : moment(d2);
  switch (compare) {
    case '>':
      return d1.isAfter(d2, unit);

    case '>=':
      return d1.isSameOrAfter(d2, unit);

    case '<=':
      return d1.isSameOrBefore(d2, unit);

    case '<':
      return d1.isBefore(d2, unit);

    case '=':
      return d1.isSame(d2, unit);

    case '!=':
      return !d1.isSame(d2, unit);

    default:
      throw new Error("Unsupported compare operator for dates !");
  }
}

const isMatchedQueryOperator = (val, queryOperators) => {
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

const isMatchedDateQueryOperator = (val, queryOperators) => {
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