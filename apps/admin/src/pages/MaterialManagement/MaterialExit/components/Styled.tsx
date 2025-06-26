import styled from 'styled-components';
import { Button } from 'antd';

export const ReloadButton = styled(Button)(() => ({
  // 样式属性
  background: 'rgba(255, 161, 83, 1)',
  '&:hover': {
    borderColor: 'white !important',
    color: 'white !important',
    background: 'rgba(255, 161, 83, 0.8) !important',
  },
}));
