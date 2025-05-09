import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from 'react';
import { Button, Col, Row, message } from 'antd';
import type { FormInstance } from 'antd/es/form';
import styled from 'styled-components';

import DictSelect from '@/components/DictSelect';
import { FormColumnsTypes, AdForm } from 'components';
import SingleTitle from '@/components/SingleTitle';

interface Props {
  /** 表单初始化 */
  detail: Record<string, any>;
  openModel: Function;
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

const FunctionCom: React.FC<Props> = forwardRef(
  ({ detail, openModel }: Props, ref) => {
    const formRef = useRef<FormInstance>(null);
    const [formKey, _] = useState<string>(
      'personnelInfoSaveReqVO'
    );
    const [subForm, setSubForm] = useState({});
    const [workerType, setWorkerType] = useState('');

    useEffect(() => {
      // console.log('detail发生变化', detail)
      if (JSON.stringify(detail) != '{}') {
        const subForm = { ...detail.personnelInfoRespVO };
        subForm.workerType =
          subForm.workerType != undefined &&
          `${subForm.workerType}`;
        setWorkerType(subForm.workerType);
        setSubForm(subForm);
      }
    }, [detail]);

    const columns: FormColumnsTypes[] = [
      {
        label: '工人类型',
        dataIndex: 'workerType',
        formItemProps: {
          rules: [{ required: true, message: '请选择工人类型' }],
        },
        formItem: (
          <DictSelect
            dictKey={'pm_worker_type'}
            onChange={(val) => {
              setWorkerType(val);
              formRef.current?.resetFields([
                'companyName',
                'companyRoleInProject',
              ]);
            }}
          />
        ),
        colNum: 24,
      },
      {
        label: '所属单位',
        dataIndex: 'companyName',
        formItemProps: {
          rules: [{ required: true, message: '请输入所属单位' }],
        },
        colNum: 24,
      },
      {
        label: '单位信用代码',
        dataIndex: 'creditCode',
        formItemProps: {
          rules: [
            { required: true, message: '请输入单位信用代码' },
          ],
        },
        colNum: 24,
      },
      {
        show: workerType == '2' ? true : false,
        label: '单位类型',
        dataIndex: 'companyRoleInProject',
        formItemProps: {
          rules: [{ required: true, message: '请选择单位类型' }],
        },
        formItem: (
          <DictSelect dictKey={'employee_company_type'} />
        ),
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
          subLabel={
            <CustomsDiv>
              红色为特殊工种，需要维护证件信息
            </CustomsDiv>
          }
        />
        <Row gutter={8} className="mt-5">
          <Col className="gutter-row" span={8}>
            <AdForm
              initialValues={subForm}
              formRef={formRef}
              labelAlign="right"
              columns={columns}
              name={formKey}
              layoutStyle={{
                labelCol: { span: 12 },
                wrapperCol: { span: 12, flex: 1 },
              }}
            />
          </Col>
          <Col className="gutter-row" span={16}>
            <Button
              className="pos-absolute"
              type="link"
              onClick={() => {
                const val: string =
                  formRef.current?.getFieldValue('workerType');
                // console.log('当前选择的工人类型', val);
                if (!val) {
                  message.warning('请先选择工人类型');
                } else {
                  openModel(val);
                }
              }}
            >
              修改信息
            </Button>
          </Col>
        </Row>
      </>
    );
  }
);

export default FunctionCom;
