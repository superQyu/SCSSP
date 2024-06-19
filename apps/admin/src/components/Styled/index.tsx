import styled from 'styled-components';
import { Button } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
// api 相关
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
// 文件下载工具
import { downFiles } from 'utils';

interface FileProps {
  /** 自定义的点击事件 */
  onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  /** 接口地址 */
  api: string;
  /** 下载文件名 */
  fileName: string;
}

const CusUploadButton = styled(Button)(() => ({
  // 样式属性
  background: 'rgba(255, 161, 83, 1)',
  '&:hover': {
    borderColor: 'white !important',
    color: 'white !important',
    background: 'rgba(255, 161, 83, 0.8) !important',
  },
}));
const ExportButton = (props: FileProps) => {
  // api 相关
  const { server } = useBasicConfiguration();
  const { basic } = server;

  return (
    <CusUploadButton
      icon={<UploadOutlined />}
      type="primary"
      onClick={(e) => {
        if (props.onClick) props.onClick(e);
        else
          basic[props.api]().then((data: any) => {
            downFiles.excel(data, props.fileName);
          });
      }}
      children="导出"
    />
  );
};

const ImportButton = styled(Button).attrs(() => ({
  // 静态属性
  icon: <PlusOutlined />,
  type: 'primary',
  children: '导入',
}))(() => ({
  // 样式属性
  background: 'rgba(1, 185, 143, 1)',
  '&:hover': {
    borderColor: 'white !important',
    color: 'white !important',
    background: 'rgba(1, 185, 143, 0.8) !important',
  },
}));

export default { ExportButton, ImportButton };
