import { useEffect, forwardRef, useState, useRef, useImperativeHandle } from 'react';
import { AdForm, FormColumnsTypes } from 'components';
import { AimOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Spin } from 'antd';

import type { FormInstance } from 'antd/es/form';
import SingleTitle from '@/components/SingleTitle';

import MapServer, { AutoComplete } from '@/components/React-BMapGL';

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
  //   const { server, config: C } = useBasicConfiguration();

  const formRef = useRef<FormInstance>(null);
  const [menus, setMenus] = useState<MenusType>({});
  const [formKey, _] = useState<string>('projectInfoSaveReqVO');
  const [getFormKey] = useState<string>('projectInfoRespVO');

  const [open, setOpen] = useState(false);
  const [openMap, setOpenMap] = useState(false);

  const [markers, setMarkers] = useState<MenusType[]>([]);
  const handleMapClick = (latlng: MenusType) => {
    setMarkers([
      {
        position: latlng,
        icon: 'loc_red',
        isTop: true,
        autoViewport: false,
        offset: { width: 0, height: -22 },
      },
    ]);
    formRef.current?.setFieldsValue({
      wgsLongitude: latlng.lng,
      wgsLatitude: latlng.lat,
    });
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setOpen(newOpen);
      return;
    }
  };
  const columns: FormColumnsTypes[] = [
    {
      label: 'WGS84经度',
      dataIndex: 'wgsLongitude',
      colNum: 8,
    },
    {
      label: 'WGS84纬度',
      dataIndex: 'wgsLatitude',
      colNum: 8,
    },
    {
      label: '',
      dataIndex: '_picklnglat',
      colNum: 8,
      formItem: (
        <Popconfirm
          open={open}
          title={
            <>
              <AimOutlined style={{ color: 'green', marginInlineEnd: '5px' }} />
              <span>点击地图拾取坐标</span>
            </>
          }
          icon={false}
          description={
            <Spin spinning={!openMap}>
              <div style={{ width: '400px', height: '350px' }}>
                {/* <AutoComplete /> */}
                {openMap && (
                  <MapServer
                    style={{ height: 'calc(100% - 38px)' }}
                    onClick={handleMapClick}
                    Marker={{
                      show: true,
                      markers: [...markers],
                    }}
                  />
                )}
              </div>
            </Spin>
          }
          showCancel={false}
          onOpenChange={handleOpenChange}
          okButtonProps={{ style: { display: 'none' } }}
          cancelButtonProps={{ style: { display: 'none' } }}
        >
          <Button
            onClick={() => setOpen(true)}
            icon={<AimOutlined />}
            style={{ backgroundColor: '#01B98F', color: '#fff' }}
          >
            坐标拾取
          </Button>
        </Popconfirm>
      ),
    },
  ];

  useEffect(() => {
    if (!open) {
      setMarkers([]);
      setOpenMap(false);
    } else {
      setOpenMap(true);
    }
  }, [open]);

  useEffect(() => {
    const isEmpty = !!Object.entries(subForm).length;
    setMenus(isEmpty && subForm.hasOwnProperty(getFormKey) ? { ...subForm[getFormKey] } : subForm);
  }, [subForm]);

  useImperativeHandle(ref, () => ({
    key: formKey,
    sourceKey: getFormKey,
    form: formRef.current,
  }));

  return (
    <>
      <SingleTitle label={'位置信息'} />
      <AdForm
        key={`${JSON.stringify(menus)}`}
        name={`LocationInfor`}
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
