type Value = number | string | undefined;

export default (value: Value) => {
  /**
   * 由于现在的字典值从后端传回的都为 Integer
   * 但是需要的却是 string
   * 而如果该字段为空(undefined), 则不能直接转为 string
   * 因为 undefined 对应的字符串为 'undefined'
   * 所以进行封装
   */
  const newVal = value != undefined ? `${value}` : undefined;
  return newVal;
};
