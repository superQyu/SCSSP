import styled from 'styled-components';
import { Collapse as AntCollapse } from 'antd';

const Collapse = styled(AntCollapse)(() => ({
  '.ant-collapse-header-text': {
    width: '80%',
  },
}));

export default { Collapse };
