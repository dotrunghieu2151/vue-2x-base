// eslint-disable-next-line no-useless-escape
export const numHyphen = (value) => value.match(/^[0-9\-]+$/);

// eslint-disable-next-line no-useless-escape
export const tel = (value) => value.match(/^0\d{2,3}-\d{1,4}-\d{4}$/) || value.match(/^0\d{9,10}$/);

// eslint-disable-next-line no-irregular-whitespace
export const zenKana = (value) => value.match(/^[ぁ-んー　]*$/);

// eslint-disable-next-line no-irregular-whitespace
export const zenKatakana = (value) => value.match(/^[ァ-ヶー　]*$/);

// eslint-disable-next-line no-irregular-whitespace
export const zipSearch = (value) => value.match(/^[ァ-ヶー　]*$/);

export const required = (value) => {
  return Array.isArray(value) ?
    (value.length > 0) :
    !['', null, undefined].includes(value);
}

export const gte = (value, target) => Number(value) >= Number(target);

export const lte = (value, target) => Number(value) <= Number(target);
