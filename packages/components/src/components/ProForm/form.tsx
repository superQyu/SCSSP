import React, { useState, useEffect, useRef } from 'react';
import { Col, Row, Form, Spin, Input } from 'antd';

import type { FormInstance } from 'antd/es/form';

type FieldType = {
  [key: string]: any;
};

export type FormColumnsTypes = {
  label: string;
  dataIndex: string;
  formItem?: JSX.Element | string;
  defaultValue?: string | number;
  formItemProps?: FieldType;
  show?: boolean;
  colNum?: 2 | 3 | 4 | 6 | 8 | 12 | 24;
  [key: string]: any;
};

export interface FornPropsTypes extends FieldType {
  loadingTitle?: string;
  initialValues?: FieldType;
  loading?: boolean;
  labelAlign?: 'left';
  columns?: FormColumnsTypes[];

  onFormChange?: (_: FieldType) => void;
  formRef: React.RefObject<FormInstance<any>>;
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18, flex: 1 },
};

const AdForm: React.FC<FornPropsTypes> = ({
  loadingTitle = '提交中...',
  labelAlign = 'left',
  loading = false,
  initialValues,
  columns = [],
  formRef = useRef<FormInstance>(null),
  onFormChange,
}: FornPropsTypes) => {
  const [menus, setMenus] = useState<FieldType>({});

  const init = () => {
    const _menus = columns.reduce((acc: FieldType, curr: FormColumnsTypes) => {
      return { ...acc, [curr.dataIndex]: curr.defaultValue || '' };
    }, {});
    setMenus(_menus);
  };

  return (
    <Spin spinning={loading} tip={loadingTitle}>
      <Form
        {...layout}
        ref={formRef}
        name="control-ref-antd-form"
        labelAlign={labelAlign}
        onValuesChange={onFormChange}
        colon={false}
        initialValues={{ ...initialValues }}
      >
        <Row gutter={16}>
          {columns.map((item: FormColumnsTypes) => (
            <Col span={item.colNum || 24} key={item.dataIndex}>
              {!item.hasOwnProperty('show') || item.show ? (
                <Form.Item<FieldType>
                  key={item.dataIndex}
                  name={item.dataIndex}
                  label={item.label}
                  {...item.formItemProps}
                >
                  {item.formItem || <Input placeholder={`请输入${item.label}`} />}
                </Form.Item>
              ) : (
                <></>
              )}
            </Col>
          ))}
        </Row>
      </Form>
    </Spin>
  );
};
export default AdForm;
