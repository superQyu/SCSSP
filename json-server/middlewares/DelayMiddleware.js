// 模拟接口延时返回的效果
function delayResponse(delay) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

// 中间件函数，用于模拟接口延时返回
module.exports = async function delayMiddleware(req, res, next) {
  await delayResponse(Math.random() * 300000); // 模拟不同的随机延时
  next();
};
