type Value = number | string | undefined;

/**
 * 由于现在的字典值从后端传回的都为 Integer
 * 但是需要的却是 string
 * 而如果该字段为空(undefined), 则不能直接转为 string
 * 因为 undefined 对应的字符串为 'undefined'
 * 所以进行封装
 * @param value 传入值(number | string | undefined)
 * @returns 返回值(string | undefined)
 */
const ToString = (value: Value) => {
  const newVal = value != undefined ? `${value}` : undefined;
  return newVal;
};

export { ToString };
