const http = require('http');
const { exec } = require('child_process');

function getParentFolder(filePath) {
  const parts = filePath.split('/');
  if (parts.length > 1) {
    parts.pop();
    return '/' + parts.join('/');
  } else {
    return '';
  }
}

// 统一处理响应的辅助函数
function sendResponse(res, statusCode, contentType, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
  });
  res.end(JSON.stringify(data));
}

const server = http.createServer((req, res) => {
  //  - %an, %ar : %s
  // const child = exec('git log -n 1 --pretty=format:"%h"', { encoding: 'buffer' });
  const url = req.url.split('?')[0];
  if (url === '/git-log') {
    const child = exec(
      'git log -n 1 --name-only --pretty=format:""',
      { encoding: 'buffer' }
    );
    let buffer = [];
    child.stdout.on('data', (chunk) => {
      buffer.push(chunk);
    });
    child.on('close', (code) => {
      if (code !== 0) {
        sendResponse(
          res,
          500,
          'text/plain',
          '执行 Git 命令时出错'
        );
        return;
      }
      const data = Buffer.concat(buffer).toString('utf-8');
      const filePaths = data
        .split('\n')
        .filter((path) => path.trim() !== '');
      const responseData = { modifiedFiles: filePaths };
      sendResponse(res, 200, 'application/json', {
        code: 0,
        data: responseData,
      });
    });
  } else if (url === '/pull-code') {
    const child = exec('git pull', { encoding: 'buffer' });
    let stdoutBuffer = [];
    let stderrBuffer = [];
    child.stdout.on('data', (chunk) => {
      stdoutBuffer.push(chunk);
    });
    child.stderr.on('data', (chunk) => {
      stderrBuffer.push(chunk);
    });
    child.on('close', (code) => {
      if (code !== 0) {
        const errorMessage =
          Buffer.concat(stderrBuffer).toString('utf-8');
        sendResponse(res, 500, 'application/json', {
          code: 500,
          message: '执行 Git pull 命令时出错',
          error: errorMessage,
        });
        return;
      }
      const output =
        Buffer.concat(stdoutBuffer).toString('utf-8');
      sendResponse(res, 200, 'application/json', {
        code: 200,
        msg: 'git pull Success!',
        output: 'output',
      });
    });
  } else if (url === '/synchronize-files') {
    if (req.method === 'POST') {
      let body = [];
      req
        .on('data', (chunk) => {
          body.push(chunk);
        })
        .on('end', () => {
          try {
            body = Buffer.concat(body).toString();
            const { paths } = JSON.parse(body);
            if (!Array.isArray(paths)) {
              sendResponse(res, 400, 'application/json', {
                code: 400,
                message: '输入必须是一个数组',
              });
              return;
            }

            const containerId = '6e3542eafb6d';
            let successCount = 0;
            let errorMessages = [];

            // 遍历数组并执行 docker cp 命令
            paths.forEach((path) => {
              const command = `docker cp ./${path} ${containerId}:/app${getParentFolder(path)}`;
              console.log(command)
              exec(command, (error, stdout, stderr) => {
                if (error) {
                  errorMessages.push(path);
                } else {
                  successCount++;
                }

                // 当所有命令执行完毕后返回响应
                if (--paths.length === 0) {
                  if (errorMessages.length === 0) {
                    res.writeHead(200, {
                      'Content-Type': 'application/json',
                    });
                    res.end(
                      JSON.stringify({
                        code: 200,
                        msg: '所有文件已成功复制到容器中',
                      })
                    );
                  } else {
                    res.writeHead(500, {
                      'Content-Type': 'application/json',
                    });
                    res.end(
                      JSON.stringify({
                        code: 500,
                        message: '部分文件复制失败',
                        errors: errorMessages,
                      })
                    );
                  }
                }
              });
            });
            sendResponse(res, 200, 'application/json', {
              code: 200,
              msg: '操作成功!',
            });
          } catch (error) {
            sendResponse(res, 400, 'application/json', {
              code: 400,
              message: '输入格式错误',
            });
          }
        });
    }
  } else {
    sendResponse(res, 200, 'text/plain', {
      code: 0,
      data: 'Hello from Node.js server',
    });
  }
});

// 监听26011端口
server.listen(26011, () => {
  console.log('Server running at http://localhost:26011/');
});

// 优雅处理关闭信号
// process.on('SIGINT', () => {
//   console.log('Server shutting down...');
//   server.close(() => {
//     console.log('Server closed successfully');
//     process.exit(0);
//   });
// });
