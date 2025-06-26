import styled from 'styled-components';
import { Button } from 'antd';

const LoginContainer = styled.div(() => ({
  height: '100vh',
  display: 'flex',
  'align-items': 'center',
  'justify-content': 'center',
  width: '100%',
  'flex-direction': 'column',

  'background-image': 'linear-gradient(to top right, rgb(24, 201, 251), rgb(1, 65, 199))',

  // 右侧表单页面
  '.ant-pro-form-login-page-left': {
    margin: '0px',
    padding: '0px',
    height: '100%',
    'max-width': '750px',
  },
  // 里面一层
  '.ant-pro-form-login-page-container': {
    // display: 'flex',
    // 'flex-direction': 'column',
    // 'justify-content': 'center',
    // width: '100%',
    // height: '100%',
    background: 'rgba(46, 187, 251, 0.3)',
    // 'border-radius': '0px',
    position: 'relative',
    top: '0',
    paddingTop: '24vh',

    // 表单标题区域
    '.ant-pro-form-login-page-top': {
      '.ant-pro-form-login-page-header': {
        width: "87%",
      },
      '.ant-pro-form-login-page-title': {
        color: 'white',
      },
      position: 'relative',
      top: '-70px',
    },
    // 表单内容区域
    '.ant-pro-form-login-page-main': {
      position: 'relative',
      marginTop: '5vh',

      '.ant-form-item': {
        marginBlockEnd: '40px',

        // 各个输入框
        '.ant-input-affix-wrapper': {
          'border-radius': '0px',
          '&-focused': {

          },
          // 输入框 input 相关
          '& input::placeholder': {
          },
          // 解决浏览器自动填充样式问题
          '& input:-webkit-autofill': {},
          // 输入框最左侧的图标
          '.ant-input-prefix::after': {
            content: "''",
            width: '1px',
            height: '23px',
            margin: '0 8px 0 10px',
          },
          // 输入框最右侧的图标
          '.ant-input-suffix': {
            '& svg': {
            },
          },
        },
      },
      // 表单底部的内容
      '.bottom': {
        // checkbox
        '.ant-checkbox-wrapper': {
          color: 'white',
          // 选择框的样式
          '.ant-checkbox-inner': {
            background: 'transparent',
            'border-color': 'white',
          },
        },
      },
    },
    '& .ant-btn-lg': {
      backgroundColor: '#2EBBFB',
      boxShadow: '0px 0px 12px rgba(0, 0, 0, .12)',

      '&:hover': {
        backgroundColor: '#2EBBFB',
        opacity: 0.75,
      },
    },
  },
}));

const ToScreenButton = styled(Button)(() => ({
  color: '#0a5ad1 !important',
  background: 'transparent !important',
  borderColor: '#0a5ad1 !important',
  opacity: 0.85,

  '&:hover': {
    opacity: 1,
    // borderColor: 'white !important',
    // color: 'white !important',
    // background: 'rgba(24, 201, 251, 0.3) !important',
  },
}));

const FormOther = styled.div`
  display: flex,
  justify-content: center,
  align-items: center,
  flex-direction: column,
`;

const FormOtherTips = styled.span`
  color: #ccc,
  font-weight: normal,
  font-size: 14px,
`;

const OtherItem = styled.div`
  display: flex,
  justify-content: center,
  align-items: center,
  flex-direction: column,
  height: 40px,
  width: 40px,
  border: 1px solid #d4d8dd,
  border-radius: 50%,
`;

export default { LoginContainer, FormOther, FormOtherTips, OtherItem, ToScreenButton };
