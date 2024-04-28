import React from 'react';
import { ProUpload } from 'components';
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

import { Col, Row, Typography, Descriptions, Button, Alert } from 'antd';

interface Props {}

const AddMenus: React.FC<Props> = () => {
  const { server } = useBasicConfiguration();
  const { file: F } = server;

  return (
    <> 
    <Alert message={<>文件上传控件:{`<ProUpload/>`}</>} type="success" style={{ marginBlockEnd: '25px' }} showIcon />
      
      <Row style={{ width: '100%', height: 'calc(100% - 75px)' }} gutter={16}>
        <Col
          style={{ width: '100%', height: '100%', overflow: 'auto' }}
          className="gutter-row"
          span={12}
        >
          <Descriptions title="上传文件 可设置上传文件个数">
            <Descriptions.Item>
              <Typography.Text style={{ whiteSpace: 'pre-wrap' }} type="success" code>
                {`maxCount={1}`}
              </Typography.Text>
            </Descriptions.Item>
          </Descriptions>
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
            maxCount={1}
          />
          <Descriptions title="自定义上传按钮(限制上传文件个数，是否显示文件列表)">
            <Descriptions.Item>
              <Typography.Text style={{ whiteSpace: 'pre-wrap' }} type="success" code>
                {`自定义上传按钮: buttonRender={<Button>上传</Button>}
 是否显示文件列表: showUploadList={false}`}
              </Typography.Text>
            </Descriptions.Item>
          </Descriptions>
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
            maxCount={2}
            buttonRender={<Button>上传</Button>}
            showUploadList={false}
          />
        </Col>
        <Col
          style={{ width: '100%', height: '100%', overflow: 'auto' }}
          className="gutter-row"
          span={12}
        >
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
    maxCount={2}
    buttonRender={<Button>上传</Button>}
    showUploadList={false}
/>`}
          </Typography.Paragraph>
          <Typography.Paragraph style={{ whiteSpace: 'pre-wrap' }} code={true} strong={true}>
            {`参数设置：{
    /** 自定义上传按钮  */
    buttonRender?: JSX.Element;
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
    /** 文件上传个数 默认 上限8个 (false 按钮一直显示 不设上限)*/ 
    maxCount?: number | false;
    /** 是否显示上传列表 */
    showUploadList?: boolean;
}`}
          </Typography.Paragraph>
        </Col>
      </Row>
    </>
  );
};
export default AddMenus;
