import React, { useRef, forwardRef, useImperativeHandle, useState } from 'react';
import { Button, Col, Row, message } from 'antd';
import type { FormInstance } from 'antd/es/form';
import styled from 'styled-components';

import DictSelect from '@/components/DictSelect';
import { AdForm } from 'components';
import { FormColumnsTypes } from 'components';
import SingleTitle from '@/components/SingleTitle';

interface Props {
  /** 表单初始化 */
  subForm: Record<string, any>;
}

const CustomsDiv = styled.div`
  font-size: 12px;
  color: #454545;
  &::before {
    content: '*';
    margin: 0 2px 0 10px;
    color: red;
  }
`;

const FunctionCom: React.FC<Props> = forwardRef(({ subForm }: Props, ref) => {
  const formRef = useRef<FormInstance>(null);
  const workerRef = useRef<FormInstance>(null);
  const [formKey, _] = useState<string>('personnelInfoSaveReqVO');
  const columns: FormColumnsTypes[] = [
    {
      label: '工人类型',
      dataIndex: 'workerType',
      formItemProps: {
        rules: [{ required: true, message: '请选择工人类型' }],
      },
      formItem: <DictSelect dictKey={'pm_worker_type'} />,
      colNum: 24,
    },
  ];

  useImperativeHandle(ref, () => ({
    key: formKey,
    form: formRef.current,
  }));

  return (
    <>
      <SingleTitle
        label="所属工种"
        subLabel={<CustomsDiv>红色为特殊工种，需要维护证件信息</CustomsDiv>}
      />
      <Row gutter={8}>
        <Col className="gutter-row" span={8}>
          <AdForm initialValues={subForm} formRef={formRef} labelAlign="right" columns={columns} />
        </Col>
        <Col className="gutter-row" span={16}>
          <Button
            className="pos-absolute"
            type="link"
            onClick={() => {
              const val: string = formRef.current?.getFieldValue('workerType');
              if (!val) {
                message.warning('请先选择工人类型');
              } else {
              }
            }}
          >
            修改信息
          </Button>
        </Col>
      </Row>
    </>
  );
});

export default FunctionCom;
