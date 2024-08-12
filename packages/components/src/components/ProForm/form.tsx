import React, { useState, useEffect, forwardRef, useRef } from 'react';
import { Col, Row, Form, Spin, Input } from 'antd';

import type { FormInstance } from 'antd/es/form';

type FieldType = {
  [key: string]: any;
};

export type FormColumnsTypes = {
  label: string;
  dataIndex: string;
  show?: boolean;
  colNum?: 2 | 3 | 4 | 6 | 8 | 12 | 16 | 24;
  /** 表单项 */
  formItem?: JSX.Element | string;
  /** 无效, 请在 Form 的 initialValues 设置 */
  defaultValue?: string | number | string[];
  /** 其他表单配置字段 */
  formItemProps?: FieldType;
  [key: string]: any;
};

export interface FormPropsTypes extends FieldType {
  /** 提交加载状态的提示 */
  loadingTitle?: string;
  /** 表单初始化值, 只会渲染一次 */
  initialValues?: FieldType;
  /** 是否为加载中状态 */
  loading?: boolean;
  /** 表单文本对齐方式 */
  labelAlign?: 'right' | 'left';
  /** labelCol 与 wrapperCol */
  layoutStyle?: any;
  /** 表单名称，会作为表单字段 id 前缀使用 */
  name?: string;
  columns?: FormColumnsTypes[];
  layout?: 'horizontal' | 'vertical' | 'inline';
  /** 字段值更新时触发回调事件 */
  onFormChange?: (_: FieldType) => void;
  formRef: React.RefObject<FormInstance<any>>;
}

const _layoutStyle = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18, flex: 1 },
};

const AdForm: React.FC<FormPropsTypes> = forwardRef(
  (
    {
      layout = 'horizontal',
      layoutStyle = {},
      loadingTitle = '提交中...',
      labelAlign = 'left',
      loading = false,
      initialValues,
      name = 'control-ref-antd-form',
      columns = [
        {
          label: '菜单1',
          dataIndex: 'name',
          colNum: 12,
          formItemProps: {
            rules: [{ required: true, message: '请输入菜单名称' }],
          },
        },
        {
          label: '菜单2',
          dataIndex: 'name2',
          colNum: 12,
          formItemProps: {
            rules: [{ required: true, message: '请输入菜单名称' }],
          },
        },
      ],
      formRef = useRef<FormInstance>(null),
      onFormChange,
    }: FormPropsTypes,
    ref
  ) => {
    const [menus, setMenus] = useState<FieldType>({});

    const init = () => {
      const _menus = columns.reduce((acc: FieldType, curr: FormColumnsTypes) => {
        return { ...acc, [curr.dataIndex]: curr.defaultValue || '' };
      }, {});
      setMenus(_menus);
    };

    useEffect(() => {
      setMenus({ ...initialValues });
    }, []);

    return (
      <Spin spinning={loading} tip={loadingTitle}>
        <Form
          key={`${Object.entries(initialValues || {}).length}`}
          {..._layoutStyle}
          {...layoutStyle}
          layout={layout}
          ref={formRef}
          name={name}
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
  }
);
export default AdForm;
