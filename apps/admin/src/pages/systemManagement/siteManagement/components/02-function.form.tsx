import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from 'react';
import {
  Input,
  Col,
  Row,
  Select,
  Button,
  message,
  Flex,
} from 'antd';
import type { FormInstance } from 'antd/es/form';
import styled from 'styled-components';
import { ToString } from '@/utils/transform';

import DictSelect from '@/components/DictSelect';
import { FormColumnsTypes, AdForm } from 'components';
import SingleTitle from '@/components/SingleTitle';
import WorkerList from './WorkerList';

interface Props {
  /** 表单初始化 */
  detail: Record<string, any>;
  openModel: Function;
  server: any;
  otherFormRef: any;
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
  ({ detail, openModel, server, otherFormRef }: Props, ref) => {
    const { subContractor, person } = server;

    const formRef = useRef<FormInstance>(null);
    const workerListForm = useRef<FormInstance>(null);

    const [formKey, _] = useState<string>(
      'personnelInfoSaveReqVO'
    );
    const [subForm, setSubForm] = useState({
      workerType: '1',
    });
    const [workerType, setWorkerType] = useState('1');
    const [subcontractorList, setSubcontractorList] = useState(
      []
    );
    const [gzOptions, setGzOptions] = useState();

    useEffect(() => {
      getSelectOptions();
    }, []);
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

    // 通过接口获取下拉框的内容
    const getSelectOptions = async () => {
      const res1 = await subContractor.getAllSubContractor();
      const list1 = res1.map((item: any) => {
        return { label: item.realName, value: `${item.id}` };
      });
      setSubcontractorList(list1);
      const { list } = await person.workType({
        pageSize: -1,
      });
      const list2 = list.map((item: any) => {
        return {
          label: item.name,
          value: item.id,
        };
      });
      setGzOptions(list2);
    };

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
              console.log('工人类型', val);
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
        label: workerType == '2' ? '管理岗位' : '所属工种',
        dataIndex:
          workerType == '2' ? 'jobCategory' : 'workTypeId',
        formItemProps: {
          rules: [{ required: true, message: '请选择单位类型' }],
        },
        formItem:
          workerType == '2' ? (
            <DictSelect dictKey={'pm_job_category'} disabled />
          ) : (
            <Select
              placeholder="请选择"
              options={gzOptions}
              disabled
            />
          ),
        // formItem: (
        //   <DictSelect dictKey={'pm_job_category'} disabled />
        // ),
        colNum: 24,
      },
      {
        label: '所属单位',
        dataIndex: 'companyName',
        colNum: 24,
        formItemProps: {
          rules: [{ required: true, message: '请输入所属单位' }],
        },
        formItem: (
          <Select
            placeholder="请选择所属单位"
            options={subcontractorList}
            onChange={async (value: string) => {
              const res =
                await subContractor.getSubContractorDetail({
                  id: value,
                });
              // console.log('单位详情', res);
              formRef.current?.setFieldsValue({
                creditCode: res.corpCode,
                companyRoleInProject: ToString(
                  res.subcontractorType
                ),
              });
              const entryForm =
                otherFormRef.current['entry'].form;
              // console.log(
              //   'entryForm',
              //   otherFormRef.current['entry']
              // );
              entryForm.form?.setFieldsValue({
                // hasInsurance: res.
              });
            }}
          />
        ),
      },
      {
        label: '单位信用代码',
        dataIndex: 'creditCode',
        formItemProps: {
          rules: [
            { required: true, message: '请输入单位信用代码' },
          ],
        },
        formItem: (
          <Input placeholder="请选择所属单位" disabled />
        ),
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
          <DictSelect dictKey={'subcontractor_type'} disabled />
        ),
        colNum: 24,
      },
    ];

    useImperativeHandle(ref, () => ({
      key: formKey,
      form: formRef.current,
      workerListForm: workerListForm.current,
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
        <Row gutter={30} className="mt-5">
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
            {/* <Button
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
            </Button> */}
            <WorkerList
              ref={workerListForm}
              subForm={{
                workerType: workerType,
              }}
              onSelect={(val: string) => {
                if (workerType == '1') {
                  formRef.current?.setFieldsValue({
                    workTypeId: val,
                  });
                } else {
                  formRef.current?.setFieldsValue({
                    jobCategory: val,
                  });
                }
              }}
            />
          </Col>
        </Row>
      </>
    );
  }
);

export default FunctionCom;
