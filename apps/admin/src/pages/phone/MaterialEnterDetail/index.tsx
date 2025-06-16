import React from 'react';
import { Form, Input, Button, Space } from 'antd-mobile';
import { useSearchParams, useNavigate } from 'react-router-dom';

import siteModel, { FormColumnVO } from './modes/form.model';
import styled from 'styled-components';
const FooterDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-block: 30px;
`;

export default function () {
  const navigate = useNavigate();
  const { formColumns, MaterialColumns } = siteModel();
  const [searchParams] = useSearchParams();
  const detail = JSON.parse(searchParams.get('detail'));
  const type =searchParams.get('type');

  const onSubmit = () => {};
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
              initialValues={el}
            >
              <Form.Header>物料{i + 1}</Form.Header>
              {MaterialColumns.map((item: FormColumnVO) => {
                return (
                  <Form.Item
                    label={item.label}
                    name={item.key}
                    key={item.key}
                  >
                    {item.formProp ? (
                      item.formProp(el)
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
      {type == 'check' ? (
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
            <Button
              block
              color="primary"
              onClick={onSubmit}
              size="small"
            >
              提交
            </Button>
          </div>
        </FooterDiv>
      ) : (
        ''
      )}
    </div>
  );
}
