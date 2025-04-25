//对获取当天
export function getNowDate() {
  let data = new Date(), //创建现在的时间
    year = data.getFullYear(), //获取年
    mon = data.getMonth() + 1; //获取月

  function auto2(val) {
    return val < 10 ? `0${val}` : val;
  }
  return `${auto2(year)}-${auto2(mon)}-${auto2(data.getDate())}`;
}
