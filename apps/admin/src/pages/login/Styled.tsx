import styled from 'styled-components';

const LoginContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-direction: column;

  background-image: linear-gradient(to top right, rgb(24, 201, 251), rgb(1, 65, 199));
  // background-image: url(https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png);
  // background-repeat: no-repeat;
  // background-position: center;
  // background-size: cover;

  :global(.ant-pro-form-login-page-desc) {
    margin-block-start: 18px;
    margin-block-end: 30px;
  }

  // 右侧表单页面
  .ant-pro-form-login-page-left {
    margin: 0px;
    padding: 0px;
    height: 100%;
    max-width: 750px;
    // 里面一层
    & > .ant-pro-form-login-page-container {
      display: flex;
      flex-direction: column;
      justify-content: center;

      width: 100%;
      height: 100%;
      background: rgba(46, 187, 251, 0.3);
      border-radius: 0px;

      // 表单标题区域
      .ant-pro-form-login-page-top {
        .ant-pro-form-login-page-title {
          color: white;
        }
        position: relative;
        top: -70px;
      }
      // 表单内容区域
      .ant-pro-form-login-page-main {
        position: relative;
        top: 10px;
        .ant-form-item {
          .ant-input-affix-wrapper {
            background: transparent;
            color: #1ef8ff;
            border-radius: 0px;
            border: 0px;
            border-bottom: 1px solid white;
          }
        }
        .bottom {
          .ant-checkbox-wrapper {
            color: white;
          }
          .ant-checkbox-inner {
            background: transparent;
          }
        }
      }
    }
  }
`;

const PageImg = styled.img`
  position: fixed;
`;

const FormOther = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const FormOtherTips = styled.span`
  color: #ccc;
  font-weight: normal;
  font-size: 14px;
`;

const OtherItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 40px;
  width: 40px;
  border: 1px solid #d4d8dd;
  border-radius: 50%;
`;

export { LoginContainer, PageImg, FormOther, FormOtherTips, OtherItem };
