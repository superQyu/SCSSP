import React from 'react';
import { Form, Input, Button, Space, Toast } from 'antd-mobile';
import { useSearchParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
import siteModel, { FormColumnVO } from './modes/form.model';
import DictSelect from '@/components/DictSelect';
const FooterDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-block: 30px;
`;

export default function () {
  const navigate = useNavigate();
  const { server } = useBasicConfiguration();
  const { materialEnter } = server;
  const { formColumns, MaterialColumns } = siteModel();
  const [searchParams] = useSearchParams();
  const detail = JSON.parse(searchParams.get('detail'));
  const type = searchParams.get('type');

  const [mainForm] = Form.useForm();
  const materialForms =
    detail.materialsDetailsWithInventoryRespVOS.map(() => {
      const [form] = Form.useForm();
      return form;
    });

  // 点击提交验收
  const onSubmit = async () => {
    const materialValuesList = await Promise.all(
      materialForms.map((form) => form.validateFields())
    );
    await materialEnter.materialAccept({
      materialsEnterDetailsSaveReqVOS: materialValuesList,
      materialsEnterSaveReqVO: detail,
    });
    Toast.show({
      icon: 'success',
      content: '操作成功',
    });
    navigate(-1);
   
  };

  // 点击审核
  const handleComfirm = async () => {
    await materialEnter.materialExamine({
      materialsEnterId: detail?.id,
      isConfirm: '通过',
    });
    Toast.show({
      icon: 'success',
      content: '操作成功',
    });
    navigate(-1);
  };

  return (
    <div className="bg-#f8f8f8">
      <Form
        layout="horizontal"
        mode="card"
        initialValues={detail}
      >
        {formColumns.map((item: FormColumnVO) => {
          return (
            <Form.Item
              label={item.label}
              name={item.key}
              key={item.key}
            >
              <Input disabled={item.disabled} />
            </Form.Item>
          );
        })}
      </Form>

      {detail.materialsDetailsWithInventoryRespVOS.map(
        (el: any, i: number) => {
          return (
            <Form
              layout="horizontal"
              mode="card"
              form={materialForms[i]}
              initialValues={el}
            >
              <Form.Header>物料{i + 1}</Form.Header>
              {MaterialColumns.map((item: FormColumnVO, i) => {
                return (
                  <Form.Item
                    label={item.label}
                    name={item.key}
                    key={item.key}
                  >
                    {item.formProp ? (
                      item.formProp(item)
                    ) : (
                      <Input disabled={item.disabled} />
                    )}
                  </Form.Item>
                );
              })}
            </Form>
          );
        }
      )}

      {type && (
        <FooterDiv>
          <div className="w-80px">
            <Button
              block
              onClick={() => navigate(-1)}
              size="small"
            >
              取消
            </Button>
          </div>
          <div className="w-80px">
            {type == 'check' && (
              <Button
                block
                color="primary"
                onClick={onSubmit}
                size="small"
              >
                提交
              </Button>
            )}
            {type == 'confirm' && (
              <Button
                block
                color="primary"
                onClick={handleComfirm}
                size="small"
              >
                通过
              </Button>
            )}
          </div>
        </FooterDiv>
      )}
    </div>
  );
}
