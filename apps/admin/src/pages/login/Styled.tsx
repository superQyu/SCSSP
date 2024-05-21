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
  // background-image: url(https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png),
  // background-repeat: no-repeat,
  // background-position: center,
  // background-size: cover,

  // 右侧表单页面
  '.ant-pro-form-login-page-left': {
    margin: '0px',
    padding: '0px',
    height: '100%',
    'max-width': '750px',
    // 里面一层
    '& > .ant-pro-form-login-page-container': {
      display: 'flex',
      'flex-direction': 'column',
      'justify-content': 'center',

      width: '100%',
      height: '100%',
      background: 'rgba(46, 187, 251, 0.3)',
      'border-radius': '0px',

      // 表单标题区域
      '.ant-pro-form-login-page-top': {
        '.ant-pro-form-login-page-title': {
          color: 'white',
        },
        position: 'relative',
        top: '-70px',
      },
      // 表单内容区域
      '.ant-pro-form-login-page-main': {
        position: 'relative',
        top: '10px',
        '.ant-form-item': {
          // 各个输入框
          '.ant-input-affix-wrapper': {
            background: 'transparent',
            color: '#1ef8ff',
            'border-radius': '0px',
            border: '0px',
            'border-bottom': '1px solid white',
            '&-focused': {
              'box-shadow': 'none',
            },
            // 输入框 input 相关
            '& input::placeholder': {
              color: '#ccc',
            },
            // 解决浏览器自动填充样式问题
            '& input:-webkit-autofill': {
              '-webkit-transition-delay': '99999s',
              '-webkit-transition': 'color 99999s ease-out, background-color 99999s ease-out',
            },
            // 输入框最左侧的图标
            '.ant-input-prefix::after': {
              content: "''",
              width: '1px',
              height: '23px',
              background: 'white',
              margin: '0 8px 0 10px',
            },
            // 输入框最右侧的图标
            '.ant-input-suffix': {
              '& svg': {
                color: 'white',
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
    },
  },
}));

const ToScreenButton = styled(Button)(() => ({
  '&:hover': {
    borderColor: 'white !important',
    color: 'white !important',
    background: 'rgba(24, 201, 251, 0.3) !important'
  }
}))

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
