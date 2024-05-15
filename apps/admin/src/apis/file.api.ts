import { ApiItem } from '@spms/web-request';

const ADMIN_API = import.meta.env.VITE_APP_ADMIN_API;

const files: ApiItem[] = [
    {
        key: 'fileUpload',
        url: `${ADMIN_API}/infra/file/upload`,
        type: 'POST',
        name: '文件上传',
        description: '文件上传',
        params: [{ key: 'Authorization', location: 'header' }],
    },
    {
        key: 'fileDelete',
        url: `${ADMIN_API}/infra/file/delete`,
        type: 'DELETE',
        name: '文件删除',
        description: '文件删除',
        params: [{ key: 'Authorization', location: 'header' }, { key: 'id' }],
    }
];
export default files;
