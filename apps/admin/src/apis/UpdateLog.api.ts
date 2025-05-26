import { ApiItem } from '@spms/web-request';

const gitLogs: ApiItem[] = [
    {
        key: 'UpdateLog',
        url: `/gitLog/git-log`,
        type: 'GET',
        name: 'UpdateLog',
        description: '获取git最新的提交记录修改内容路径'
    },
    {
        key: 'SynchronizeFiles',
        url: `/gitLog/synchronize-files`,
        type: 'POST',
        name: 'SynchronizeFiles',
        description: '同步文件',
        params: [
            { key: 'paths', cn: '文件路径列表' },
        ],
    },
    {
        key: 'PullCode',
        url: `/gitLog/pull-code`,
        type: 'GET',
        name: 'PullCode',
        description: '更新代码'
    }
];
export default gitLogs;
