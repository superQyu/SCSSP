const fs = require('fs');
const path = require('path');
const cliProgress = require('cli-progress');

// 创建一个新的进度条实例
const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

function deleteNodeModules(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      if (file === 'node_modules') {
        console.log('Deleting', filePath);
        // 开始进度条
        progressBar.start(100, 0);
        fs.rmdirSync(filePath, { recursive: true });
        // 更新进度条
        progressBar.update(100);
        // 停止进度条
        progressBar.stop();
      } else {
        deleteNodeModules(filePath);
      }
    }
  });
}

// 删除指定目录下的 node_modules 文件夹，并显示进度条
deleteNodeModules(path.resolve(__dirname, '..'));
