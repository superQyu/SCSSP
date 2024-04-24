import React from 'react';
import { ProUpload } from 'components';
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

import { Col, Row, Typography } from 'antd';

interface Props {}

const AddMenus: React.FC<Props> = () => {
  const { server } = useBasicConfiguration();
  const { file: F } = server;

  return (
    <>
      <Row gutter={16}>
        <Col className="gutter-row" span={12}>
          <ProUpload
            onRequest={async (params: any) => await F.fileUpload(params)}
            onUploadSuccess={(res: any) => {
              console.log('上传成功:', res);
            }}
            onUploadError={(err: any) => {
              console.log('上传失败');
            }}
            onDeleted={(uid: string) => {
              console.log('文件ID:', uid);
            }}
          />
        </Col>
        <Col className="gutter-row" span={12}>
          <Typography.Paragraph style={{ whiteSpace: 'pre-wrap' }} code={true} strong={true}>
            <Typography.Text type="success" code>
              {`import { ProUpload } from 'components';`}
            </Typography.Text>
          </Typography.Paragraph>
          <Typography.Paragraph style={{ whiteSpace: 'pre-wrap' }} code={true} strong={true}>
            {`<ProUpload
    onRequest={async (params: any) => await F.fileUpload(params)}
    onUploadSuccess={(res: any) => {
    console.log('上传成功');
    }}
    onUploadError={(err: any) => {
    console.log('上传失败');
    }}
    onDeleted={(uid: string) => {
      console.log('文件ID:', uid);
    }}
/>`}
          </Typography.Paragraph>
          <Typography.Paragraph style={{ whiteSpace: 'pre-wrap' }} code={true} strong={true}>
            {`参数设置：
{
    /** 上传接口配置  */
    onRequest?: (params: any) => Promise<Partial<RequestData<any>>>;
    /** 上传成功  */
    onUploadSuccess?: (params: any) => void;
    /** 上传失败 */
    onUploadError?: (params?: any) => void;
    /** 文件删除 返回uid */
    onDeleted?: (uid: string) => void;
    /** 文件上传类型  默认  ['image/jpeg', 'image/png']*/
    fileType?: string[];
    /** 文件上传大限制 默认 20M*/
    fileSize?: number;
}`}
          </Typography.Paragraph>
        </Col>
      </Row>
    </>
  );
};
export default AddMenus;
