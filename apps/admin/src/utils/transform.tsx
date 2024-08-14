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

/**
 * 将 字符串 转化为 url 数组
 * @param arr 需要转化的字符串
 * @param split 分隔符
 */
const toUrlArr = (str: string | undefined, split: string) => {
  let realStr = undefined;
  // str 如果是空字符串 '', 其调用 split 传化后的值就为 ['']
  if (str && str.length != 0) realStr = str;
  return realStr?.split(split);
};

export { ToString, toUrlArr };
