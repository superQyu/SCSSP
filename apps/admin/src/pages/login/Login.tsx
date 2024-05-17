import {
  LoginFormPage,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { Col, Row, Avatar, Divider, Form, message, Space, Tabs, Button } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext, useAppDispatch } from 'hooks';
import { logo, title, describe } from '@/config';

// Current usage CSS stylesheet
// import styles from './index.module.scss';
import { LoginContainer, FormOther, FormOtherTips, OtherItem, PageImg } from './Styled';

import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

type LoginType = 'phone' | 'account';

const Login: React.FC = () => {
  const { server } = useBasicConfiguration();
  const { signIn, saveUserInfor } = useContext(AuthContext);
  const navigator = useNavigate();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [captcha, setcaptcha] = useState<string>('');
  const [loginType, setLoginType] = useState<LoginType>('account');

  const items = [
    { label: '账号密码登录', key: 'account' },
    { label: '手机号登录', key: 'phone', disabled: true },
  ];

  const [form] = Form.useForm();
  //  api server
  const { login } = server;
  // 获取图片验证
  const getCaptchaVal = () => {
    return;
    if (loading) return;
    setcaptcha('');
    // 重置 验证码
    form.resetFields(['captcha']);
    login
      .captcha({ height: 40, type: 'string' })
      .then((res: any) => {
        setcaptcha(res);
      })
      .catch(() => {
        setcaptcha(`<img src="/src/assets/404.png">`);
      });
  };
  useEffect(() => {
    form.setFieldsValue({ username: 'hgzhjg', password: 'hgzhjg123', remember: false });
    getCaptchaVal();
  }, []);
  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      setLoading(true);
      login
        .adminLogin({ ...values })
        .then(async (res: any) => {
          console.info('%c✔  登陆成功！！！ ==============', 'color: green; font-size: 14px;');

          const { accessToken } = res;
          navigator('/');
          // 储存令牌
          await signIn(dispatch, accessToken);
          // 保存用户信息
          await saveUserInfor(dispatch, res);
        })
        .catch(() => {
          getCaptchaVal();
          setLoading(false);
        });
    } finally {
      setLoading(false);
    }
  };
  const handlerTabsChange = (activeKey: any) => {
    setLoginType(activeKey);
    form.resetFields();
  };

  return (
    <LoginContainer>
      <PageImg
        style={{
          zIndex: 99,
          top: '15%',
          left: '8%',
        }}
        width={'500'}
        src={new URL('@/assets/login/title.svg', import.meta.url).href}
      />
      <PageImg
        style={{
          bottom: '-10%',
          left: '-2%',
        }}
        width={'50%'}
        src={new URL('@/assets/login/img.svg', import.meta.url).href}
      />
      <LoginFormPage
        form={form}
        onFinish={onFinish}
        // logo={<Avatar src={logo} />}
        title="您好，欢迎登录！"
        // subTitle={describe}
        loading={loading ? true : undefined}
        actions={
          <Button className='mt-4 w-full h-40px' ghost>数据大屏</Button>
          // <FormOther>
          //   <Divider plain>
          //     <FormOtherTips>其他登录方式</FormOtherTips>
          //   </Divider>
          //   <Space align="center" size={24}>
          //     <OtherItem />
          //     <OtherItem />
          //     <OtherItem />
          //   </Space>
          // </FormOther>
        }
      >
        <Tabs
          centered
          activeKey={loginType}
          onChange={(activeKey: any) => handlerTabsChange(activeKey as LoginType)}
          items={items}
        ></Tabs>
        {loginType === 'account' && (
          <>
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: (
                  <img
                    color="black"
                    src={new URL('@/assets/login/user.svg', import.meta.url).href}
                  />
                ),
              }}
              placeholder={'用户名'}
              rules={[{ required: true, message: '请输入用户名!' }]}
              disabled={loading}
              initialValue={{ username: 'admin', password: '123456', remember: false }}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <img src={new URL('@/assets/login/user.svg', import.meta.url).href} />,
              }}
              placeholder={'密码'}
              rules={[{ required: true, message: '请输入密码！' }]}
              disabled={loading}
            />
            {/* <Row>
              <Col span={12}>
                <ProFormText
                  name="captcha"
                  fieldProps={{ size: 'large' }}
                  placeholder={'验证码'}
                  rules={[{ required: true, message: '请输入验证码!' }]}
                  disabled={loading}
                />
              </Col>
              <Col span={12} className={styles.captchaLoading}>
                {captcha === '' ? (
                  <></>
                ) : (
                  <div
                    className={styles.captchaInner}
                    onClick={() => {
                      getCaptchaVal();
                    }}
                    dangerouslySetInnerHTML={{ __html: captcha }}
                  ></div>
                )}
              </Col>
            </Row> */}
          </>
        )}
        {loginType === 'phone' && (
          <>
            <ProFormText
              fieldProps={{ size: 'large' }}
              name="mobile"
              placeholder={'手机号'}
              rules={[
                { required: true, message: '请输入手机号！' },
                { pattern: /^1\d{10}$/, message: '手机号格式错误！' },
              ]}
            />
            <ProFormCaptcha
              fieldProps={{ size: 'large' }}
              captchaProps={{
                size: 'large',
              }}
              placeholder={'请输入验证码'}
              captchaTextRender={(timing, count) => {
                if (timing) {
                  return `${count} ${'获取验证码'}`;
                }
                return '获取验证码';
              }}
              name="phoneCaptcha"
              rules={[{ required: true, message: '请输入验证码！' }]}
              onGetCaptcha={async () => {
                message.success('获取验证码成功！验证码为：1234');
              }}
            />
          </>
        )}
        <div className='bottom' style={{ marginBlockEnd: 24 }}>
          <ProFormCheckbox noStyle name="autoLogin" disabled={loading} valuePropName="checked">
            记住密码
          </ProFormCheckbox>
          <a style={{ float: 'right', color: 'white' }}> 忘记密码</a>
        </div>
      </LoginFormPage>
    </LoginContainer>
  );
};

export default Login;
