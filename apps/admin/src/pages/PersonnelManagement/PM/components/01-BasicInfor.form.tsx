import { useEffect, forwardRef, useState, useRef, useImperativeHandle } from 'react';
import { AdForm, FormColumnsTypes } from 'components';

import { InputNumber, DatePicker, Input, Select } from 'antd';

import type { FormInstance } from 'antd/es/form';
import dayjs from 'dayjs';

import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
import SingleTitle from '@/components/SingleTitle';
import { ProUpload } from 'components';

import DictSelect from '@/components/DictSelect';

type MenusType = {
  [key: string]: any;
};

interface MenusPropsType extends MenusType {
  /** 控制 Modal 是否显示 */
  openModal: boolean;
  /** 表单初始化 */
  subForm: MenusType;
  /** 监听表单字段状态变化 */
  onFormChange: () => void;
}

const DefultForm: React.FC<MenusPropsType> = forwardRef(({ subForm, onFormChange }, ref) => {
  const { server } = useBasicConfiguration();
  const { file: F, basic: B } = server;

  const formRef = useRef<FormInstance>(null);
  const [menus, setMenus] = useState<MenusType>({});
  const [formKey, _] = useState<string>('projectInfoSaveReqVO');
  const [getFormKey] = useState<string>('projectInfoRespVO');

  const [provinceList, setProvinceList] = useState<MenusType[]>([]);
  const [cityList, setCtyList] = useState<MenusType[]>([]);
  const [districtList, setDistrictList] = useState<MenusType[]>([]);

  const columns: FormColumnsTypes[] = [
    {
      label: '项目编号',
      dataIndex: 'projectNo',
      colNum: 8,
      formItemProps: {
        rules: [{ required: true }],
      },
    },
    {
      label: '项目名称',
      dataIndex: 'projectName',
      colNum: 8,
      formItemProps: {
        rules: [{ required: true }],
      },
    },
    {
      label: '建设单位名称',
      dataIndex: 'buildCompanyName;',
      colNum: 8,
    },
    {
      label: '统一社会信用代码',
      dataIndex: 'unifiedSocialCreditCode',
      colNum: 8,
    },
    {
      label: '施工单位名称',
      dataIndex: 'constructionCompanyName',
      colNum: 8,
      formItemProps: {
        rules: [{ required: true }],
      },
    },
    {
      label: '建设用地规划许可证编号',
      dataIndex: 'constructionLandUsePermitCode;',
      colNum: 8,
    },
    {
      label: '建设工程规划许可证编号',
      dataIndex: 'constructionEngineeringPlanningPermitCode;',
      colNum: 8,
    },
    {
      label: '省份',
      dataIndex: 'province',
      colNum: 8,
      formItem: (
        <Select
          key={`${menus.province}`}
          placeholder="请选择所属市"
          onChange={(_, { children }: MenusType) => {
            formRef.current?.resetFields(['city']);
            formRef.current?.resetFields(['district']);
            setCtyList(children);
            setDistrictList([]);
          }}
          options={provinceList.map((item) => ({
            label: item.name,
            value: `${item.id}`,
            children: item.children,
          }))}
        />
      ),
      formItemProps: {
        rules: [{ required: true }],
      },
    },
    {
      label: '所属市',
      dataIndex: 'city',
      colNum: 8,
      formItem: (
        <Select
          placeholder="请选择所属市"
          onChange={(_, { children }: MenusType) => {
            formRef.current?.resetFields(['district']);
            setDistrictList(children);
          }}
          options={cityList.map((item) => ({
            label: item.name,
            value: `${item.id}`,
            children: item.children,
          }))}
        />
      ),
      formItemProps: {
        rules: [{ required: true }],
      },
    },
    {
      label: '所属区/县',
      dataIndex: 'district',
      colNum: 8,
      formItem: (
        <Select
          placeholder="请选择所属市"
          options={districtList.map((item) => ({ label: item.name, value: `${item.id}` }))}
        />
      ),
      formItemProps: {
        rules: [{ required: true }],
      },
    },
    {
      label: '项目地址',
      dataIndex: 'projectAddress',
      colNum: 8,
      formItemProps: {
        rules: [{ required: true }],
      },
    },
    {
      label: '项目状态',
      dataIndex: 'projectStatus',
      formItem: <DictSelect dictKey={`project_status`} dropdownExtend={false} />,
      colNum: 8,
      formItemProps: {
        rules: [{ required: true }],
      },
    },
    {
      label: '项目分类',
      dataIndex: 'projectType',
      formItem: <DictSelect dictKey={`project_type`} dropdownExtend={false} />,
      colNum: 8,
    },
    {
      label: '工程用途',
      dataIndex: 'engineeringUse;',
      colNum: 8,
    },
    {
      label: '建设性质',
      dataIndex: 'buildProperties;',
      colNum: 8,
    },
    {
      label: '总造价(万元)',
      dataIndex: 'projectCost',
      formItem: <InputNumber min={0} style={{ width: '100%' }} />,
      colNum: 8,
    },
    {
      label: '总面积(㎡)',
      dataIndex: 'projectArea',
      formItem: <InputNumber min={0} style={{ width: '100%' }} />,
      colNum: 8,
    },
    {
      label: '总长度(m)',
      dataIndex: 'totalToll',
      colNum: 8,
    },
    {
      label: '实际开工日期',
      dataIndex: 'actualStartTime',
      formItem: <DatePicker style={{ width: '100%' }} />,
      colNum: 8,
    },
    {
      label: '实际竣工日期',
      dataIndex: 'actualEndTime',
      formItem: <DatePicker style={{ width: '100%' }} />,
      colNum: 8,
    },
    {
      label: '联系人姓名',
      dataIndex: 'contactName',
      colNum: 8,
    },
    {
      label: '联系人办公电话',
      dataIndex: 'contactNumber',
      colNum: 8,
    },
    {
      label: '立项文号',
      dataIndex: 'projectApprovalDocumentNumber',
      colNum: 8,
    },
    {
      label: '立项级别',
      dataIndex: 'projectInitiationLevel',
      colNum: 8,
    },
    {
      label: '建筑规模',
      dataIndex: 'architecturalScale',
      colNum: 8,
    },
    {
      label: '项目介绍/工程概况',
      dataIndex: 'projectProfile',
      formItem: (
        <Input.TextArea placeholder="项目介绍/工程概况" autoSize={{ minRows: 4 }} allowClear />
      ),
      colNum: 8,
    },
    {
      label: '备注',
      dataIndex: 'remarks',
      formItem: <Input.TextArea placeholder="备注" autoSize={{ minRows: 4 }} allowClear />,
      colNum: 8,
    },
    {
      show: false,
      label: '',
      dataIndex: '_',
      colNum: 8,
    },
    {
      label: '项目图片上传',
      dataIndex: 'projectImage',
      formItem: (
        <div style={{ paddingInlineStart: '13px' }}>
          <ProUpload
            onRequest={async (params: any) => await F.fileUpload(params)}
            onUploadSuccess={(res: any) => {
              console.log('上传成功:', res);
            }}
            onUploadError={(err: any) => {
              console.log('上传失败');
            }}
            onDeleted={(uid: string) => {
              console.log('文件ID:', uid);
            }}
          />
        </div>
      ),
      colNum: 24,
      formItemProps: {
        labelCol: { span: 3 },
        wrapperCol: { span: 21, flex: 1 },
      },
    },
  ];

  const init = async () => {
    const list = await B.getAreaList();
    setProvinceList(list);
    if (menus.province) {
      const citys = list.filter((item: MenusType) => item.id == menus.province)[0] || {};
      setCtyList(citys.children || []);
      if (menus.city) {
        const districts =
          (citys.children || []).filter((item: MenusType) => item.id == menus.city)[0] || {};
        setDistrictList(districts.children || []);
      }
    }
  };

  useEffect(() => {
    const isEmpty = !!Object.entries(subForm).length;
    const { actualStartTime, actualEndTime } = subForm[getFormKey] || {};
    setMenus(
      isEmpty && subForm.hasOwnProperty(getFormKey)
        ? {
            ...{
              ...subForm[getFormKey],
              actualStartTime: actualStartTime ? dayjs(actualStartTime) : '',
              actualEndTime: actualEndTime ? dayjs(actualEndTime) : '',
            },
          }
        : subForm
    );
  }, [subForm]);

  useEffect(() => {
    init();
  }, [menus]);

  useImperativeHandle(ref, () => ({
    key: formKey,
    form: formRef.current,
    transform: (value: MenusType) => {
      return {
        ...value,
        actualStartTime: dayjs(value.actualStartTime).valueOf(),
        actualEndTime: dayjs(value.actualEndTime).valueOf(),
      };
    },
  }));

  return (
    <>
      <SingleTitle label={'基本信息'} />
      <AdForm
        key={`${Object.entries(menus).length}`}
        name={`${formKey}`}
        formRef={formRef}
        initialValues={{ ...menus }}
        labelAlign="right"
        columns={columns}
        layoutStyle={{
          labelCol: { span: 10 },
          wrapperCol: { span: 16, flex: 1 },
        }}
        onFormChange={onFormChange}
        // loadingTitle="提交中..."
        // loading={loading}
      />
    </>
  );
});
export default DefultForm;
