import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {
  Button,
  message,
  Modal,
  Collapse,
  Flex,
  Select,
  Popconfirm,
  Spin,
} from 'antd';
import type { CollapseProps } from 'antd';
import {
  LeftOutlined,
  DeleteOutlined,
  AuditOutlined,
} from '@ant-design/icons';
import type { FormInstance } from 'antd/es/form';

import { AdForm, FormColumnsTypes, ProUpload } from 'components';
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
import siteModel from '../modes/info.model';
import styles from '../index.module.scss';
import type { ModesApi } from '../modes/model';
import { jobCategoryDanger } from '@/config';
import Styled from '../Styled';
import { ToString } from '@/utils/transform';
import SingleTitle from '@/components/SingleTitle';

interface Props {
  /** 表单初始化 */
  subForm: Record<string, any>;
  /** 监听Modal状态变化 */
  onStateChange?: (state: any) => void;
  /** 监听确定按钮提交 */
  // onSubmit: (state: ModesApi.PersonnelCertificateSaveReqVO[]) => void;
  onSubmit: (state: any) => void;
  /** 编辑时的证书详情 */
  detail?: Record<string, any>;
  // 是否可修改
  ifEdit: Boolean;
}

interface FileItem {
  uid: string;
  name: string;
  url: string;
}

interface workTypeItem {
  label: string;
  value: string;
  [key: string]: string;
}

type MenusType = {
  [key: string]: any;
};

const FunctionCom: React.FC<Props> = forwardRef(
  ({ subForm, onSubmit, detail, ifEdit }: Props, ref) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);

    const { server } = useBasicConfiguration();
    const formRef = useRef<FormInstance>(null);

    const [title] = useState<string>('所属工种');
    const [columns, setColumns] = useState<FormColumnsTypes[]>(
      []
    );
    const [options, setOptions] = useState([]);

    const [curVal, setCurVal] = useState<string>('');
    const [ifcertificate, setIfcertificate] =
      useState<boolean>(false);
    const [collapseItem, setCollapseItem] = useState<
      CollapseProps['items']
    >([]);
    // 当前文件列表（证书图片列表, 控制初始化）
    const [fileList, setFileList] = useState<FileItem[]>([]);
    // 证书的删除id
    const [delIndex, setDelIndex] = useState<number>(-1);
    // jobCategory 代表管理岗位, workTypeId 代表工种
    const [functionKey, setFunctionKey] = useState<
      'jobCategory' | 'workTypeId'
    >('jobCategory');
    const certificateRef = useRef<FormInstance[]>([]);
    const [activeKey, setActiveKey] = useState('');
    // 控制所属工种表单的默认值
    const [initialValues, setInitialValues] = useState<any>({});

    const [spinning, setSpinning] = useState<Boolean>(false);
    const [ocrDetail, setOcrDetail] = useState<any>({});
    const { file: F, basic: B, person: P, certificate } = server;

    const { certificateColumns } = siteModel({ server });

    const init = async (key: 'jobCategory' | 'workTypeId') => {
      let options = [];
      if (subForm.workerType == '2') {
        const { list } = await B.getDictType({
          dictType: 'pm_job_category',
        });
        options = list.map((item: workTypeItem) => {
          return {
            label: item.label,
            value: `${item.value}`,
            danger: jobCategoryDanger.some(
              (el) => el.label == item.label
            ),
          };
        });
      } else {
        const { list } = await P.workType({
          pageSize: -1,
        });
        options = list.map((item: workTypeItem) => {
          return {
            label: item.name,
            value: `${item.id}`,
            danger: item.isSpecialWorkType,
          };
        });
      }
      const label =
        subForm.workerType == '2' ? '管理岗位' : '所属工种';
      setColumns([
        {
          label: `${label}`,
          dataIndex: `${key}`,
          formItemProps: {
            rules: [
              { required: true, message: `请选择${label}` },
            ],
          },
          formItem: (
            <Select
              options={options}
              placeholder={'请选择' + label}
              disabled
              // 不知道为啥, 该事件无效
              onChange={(val) => {
                console.log('当前工种信息字段', val);
              }}
            />
          ),
          colNum: 24,
        },
      ]);
      setOptions(options);
    };

    // 选择工种
    const workTypeClick = ({ value = '', danger = false }) => {
      setCurVal(value);
      setIfcertificate(danger);
      // console.log('当前选择的工种', functionKey, value);
      formRef.current?.setFieldValue([functionKey], value);
    };

    const handleAddItem = (
      newFile: FileItem,
      collapseItemIdx: number
    ) => {
      setCollapseItem((collapseItem = []) => {
        let subForm = {
          credentialName: ocrDetail['证书名称'],
          credentialNumber:
            ocrDetail['证书编号'] || ocrDetail['编号'],
          validityStartDate: ocrDetail['有效期始']
            ? new Date(
                ocrDetail['有效期始']
                  .replace(/年/g, '-')
                  .replace(/月/g, '-')
                  .replace(/日/g, '')
              ).getTime()
            : '',
          validityEndDate: ocrDetail['有效期止']
            ? new Date(
                ocrDetail['有效期止']
                  .replace(/年/g, '-')
                  .replace(/月/g, '-')
                  .replace(/日/g, '')
              ).getTime()
            : '',
          ...detail?.personnelCertificateRespVOS?.[
            collapseItemIdx
          ],
        };
        return [
          ...collapseItem,
          {
            className: 'title',
            key: newFile.uid,
            forceRender: true,
            label: (
              <div className="truncate font-700 color-#458FFF">
                {newFile.name}
              </div>
            ),
            children: (
              <>
                <AdForm
                  initialValues={subForm}
                  layout="horizontal"
                  formRef={(el: any) =>
                    (certificateRef.current[collapseItemIdx] =
                      el)
                  }
                  columns={certificateColumns}
                  disabled={ifEdit}
                />
                {!ifEdit ? (
                  <Flex justify="flex-end">
                    <Popconfirm
                      key="delete"
                      title="删除此项"
                      description="一旦删除, 将不可回退!"
                      onConfirm={() =>
                        delIconClick(collapseItemIdx)
                      }
                      okText="确认"
                      cancelText="取消"
                    >
                      <Button
                        type="primary"
                        icon={<DeleteOutlined />}
                        danger
                      >
                        删除
                      </Button>
                    </Popconfirm>
                  </Flex>
                ) : (
                  ''
                )}
              </>
            ),
          },
        ];
      });
      setActiveKey(newFile.uid);
      setSpinning(false);
    };

    const handleDelItem = async () => {
      // console.log('delIndex', delIndex);
      // 以下是接口删除逻辑
      const id =
        certificateRef.current[delIndex]?.getFieldValue('id');
      // console.log('id', id);
      if (id) await certificate.deleteCertificate({ id });
      // 以下是页面显示逻辑
      const list = [...collapseItem];
      const newList = list.filter(
        (item) => item.key != `${delIndex}`
      );
      // newList.splice(delIndex, 1);
      // console.log('newList', newList);
      certificateRef.current[delIndex] = null;
      setCollapseItem(newList);
    };

    // 点击删除按钮
    const delIconClick = (index: number) => {
      setDelIndex(index);
    };

    // 点击确定按钮
    const handleOk = async () => {
      const label =
        subForm.workerType == '2' ? '管理岗位' : '工人类型';
      let arr = [] as ModesApi.PersonnelCertificateSaveReqVO[];
      const refs = certificateRef.current.filter(
        (item) => item != null
      );
      if (ifcertificate && !refs.length) {
        message.warning(`该${label}需上传证书信息`);
        return;
      }
      if (refs.length) {
        refs.forEach(async (el, index) => {
          if (el) {
            const elValue: MenusType = await el.validateFields();
            arr.push({
              ...elValue,
              picture: fileList[index].url,
            });
          }
          onSubmit({ certificate: arr, [functionKey]: curVal });
          setOpen(false);
        });
      } else {
        onSubmit({ certificate: [], [functionKey]: curVal });
        setOpen(false);
      }
    };

    const handleCancel = () => {
      if (loading) {
        message.warning(`数据提交中,请稍等...`);
        return;
      }
      setFileList([]);
      setCollapseItem([]);
      setOpen(false);
    };

    // 重置所有
    const resetAll = () => {
      formRef.current?.resetFields();
      setCurVal('');
      setIfcertificate(false);
      setCollapseItem([]);
    };

    const setFormModal = (value: boolean) => setOpen(value);

    useEffect(() => {
      // setOpen(true);
      // setOpen(false);
      init('workTypeId');
    }, []);

    useEffect(() => {
      if (fileList.length > (collapseItem?.length as number)) {
        // console.log('fileList 增加', fileList, collapseItem.current);
        const newFileList = fileList?.filter((newI) => {
          return !collapseItem?.find(
            (oldI) => oldI.key == newI.uid
          );
        });
        // console.log('newFileList', newFileList);
        newFileList.forEach(async (item, index) => {
          let collapseItemIdx: number;
          if (newFileList.length != 1) {
            // 说明一次性添加了多个证件
            // 只有在初始化时可能出现该情况
            // 此时 collapseItemIdx 与 index 保持一致
            collapseItemIdx = index;
          } else {
            collapseItemIdx = fileList.length - 1;
          }
          handleAddItem(item, collapseItemIdx);
        });
      } else {
        handleDelItem();
      }
    }, [fileList]);

    useEffect(() => {
      const newList = [...fileList];
      newList.splice(delIndex, 1);
      setFileList(newList);
    }, [delIndex]);

    useEffect(() => {
      // setOpen(true);
      // setOpen(false);
      if (subForm?.workerType) {
        const key =
          subForm.workerType == '2'
            ? 'jobCategory'
            : 'workTypeId';
        setFunctionKey(key);
        init(key);
      }
    }, [subForm]);

    useEffect(() => {
      if (Object.entries(detail || {}).length > 0) {
        // console.log('detail', detail, functionKey);
        // 所属工种表单的默认值
        const key =
          detail?.personnelInfoRespVO?.workerType == '2'
            ? 'jobCategory'
            : 'workTypeId';
        const value = detail?.personnelInfoRespVO?.[`${key}`];
        const strValue = ToString(value);
        let initValue = { [key]: strValue };
        // console.log('初始化工种表单', initValue, strValue);
        setInitialValues(initValue);
        setCurVal(strValue || '');
        // 证书列表默认值
        const list =
          detail?.personnelCertificateRespVOS?.map(
            (item: any, index: number) => {
              return {
                uid: `${index}`,
                name: item.picture?.split('/')?.slice(-1)[0],
                url: item.picture,
              };
            }
          ) || [];
        // console.log('初始化文件列表', list);
        setFileList(list);
      }
    }, [detail]);

    useImperativeHandle(ref, () => ({
      form: formRef.current,
      resetAll,
      setFormModal,
      handleOk,
    }));

    return (
      // <Modal
      //   forceRender={true}
      //   open={open}
      //   title={title}
      //   onOk={handleOk}
      //   onCancel={handleCancel}
      //   maskClosable={false}
      //   footer={[
      //     <Button
      //       key="submit"
      //       type="primary"
      //       loading={loading}
      //       onClick={handleOk}
      //     >
      //       确定
      //     </Button>,
      //     <Button
      //       key="back"
      //       onClick={handleCancel}
      //       disabled={loading}
      //     >
      //       取消
      //     </Button>,
      //   ]}
      //   width={'50%'}
      // >
      // <div
      //   className="max-h-70vh p-inline-4"
      //   style={{ overflow: 'hidden auto' }}
      // >
      //   <AdForm
      //     formRef={formRef}
      //     initialValues={initialValues}
      //     labelAlign="left"
      //     columns={columns}
      //     layoutStyle={{
      //       labelCol: { span: 3 },
      //       wrapperCol: { span: 10, flex: 1 },
      //     }}
      //   />
      //   <Flex wrap="wrap" gap="middle">
      //     {options.map((item: workTypeItem) => {
      //       return (
      //         <Button
      //           key={item.value}
      //           type="default"
      //           danger={item.danger || false}
      //           style={
      //             curVal == item.value
      //               ? {
      //                   color: '#379E04',
      //                   background: 'rgba(103,194,58,0.2',
      //                   border: 'none',
      //                 }
      //               : {}
      //           }
      //           onClick={() => workTypeClick(item)}
      //         >
      //           {item.label}
      //         </Button>
      //       );
      //     })}
      //   </Flex>

      //   <div className={styles.infoTitle}>
      //     <Flex
      //       justify={'space-between'}
      //       align={'center'}
      //       className="w-full"
      //     >
      //       证书信息
      //       <ProUpload
      //         buttonRender={
      //           <Button
      //             icon={<AuditOutlined />}
      //             className="bg-#67c23a color-#fff"
      //             size="large"
      //           >
      //             上传证书
      //           </Button>
      //         }
      //         onRequest={async (params: any) =>
      //           await F.fileUpload(params)
      //         }
      //         onUploadSuccess={async (res) => {
      //           const uid = Object.keys(res)[0];
      //           const { name, url } = Object.values(res)[0] as {
      //             name: string;
      //             url: string;
      //           };
      //           setFileList([
      //             ...fileList,
      //             {
      //               uid,
      //               name,
      //               url,
      //             },
      //           ]);
      //         }}
      //         maxCount={false}
      //         showUploadList={false}
      //       />
      //     </Flex>
      //   </div>

      //   <Styled.Collapse
      //     activeKey={activeKey}
      //     accordion
      //     items={collapseItem}
      //     bordered={false}
      //     style={{ background: '#fff' }}
      //     expandIconPosition="end"
      //     // expandIcon={({ isActive, panelKey }) => (
      //     //   <LeftOutlined
      //     //     rotate={isActive ? 90 : 0}
      //     //     onClick={() => {
      //     //       const index = !isActive ? panelKey : -1;
      //     //       setActiveKey(index);
      //     //     }}
      //     //   />
      //     // )}
      //     onChange={(props) => {
      //       // console.log('当前展开项', props);
      //       setActiveKey(props[0]);
      //     }}
      //   />
      // </div>
      // </Modal>
      <>
        <Spin
          className="h-full"
          spinning={spinning}
          tip="正在上传解析证书..."
        >
          <SingleTitle
            label="证书信息"
            subLabel={
              <div className="ml-3">
                {!ifEdit ? (
                  <ProUpload
                    buttonRender={
                      <Button
                        icon={<AuditOutlined />}
                        className="bg-#67c23a color-#fff"
                        size="large"
                      >
                        上传证书
                      </Button>
                    }
                    onRequest={async (params: any) =>
                      await F.fileUpload(params)
                    }
                    onUploadSuccess={async (res) => {
                      setSpinning(true);
                      const uid = Object.keys(res)[0];
                      const { name, url } = Object.values(
                        res
                      )[0] as {
                        name: string;
                        url: string;
                      };
                      // return
                      const data = await certificate.ocrScan({
                        picUrl: url,
                      });
                      setOcrDetail(JSON.parse(data));
                      setFileList([
                        ...fileList,
                        {
                          uid,
                          name,
                          url,
                        },
                      ]);
                    }}
                    maxCount={false}
                    showUploadList={false}
                  />
                ) : (
                  ''
                )}
              </div>
            }
          />
          <Styled.Collapse
            activeKey={activeKey}
            accordion
            items={collapseItem}
            bordered={false}
            style={{ background: '#fff' }}
            expandIconPosition="end"
            // expandIcon={({ isActive, panelKey }) => (
            //   <LeftOutlined
            //     rotate={isActive ? 90 : 0}
            //     onClick={() => {
            //       const index = !isActive ? panelKey : -1;
            //       setActiveKey(index);
            //     }}
            //   />
            // )}
            onChange={(props) => {
              // console.log('当前展开项', props);
              setActiveKey(props[0]);
            }}
          />
        </Spin>{' '}
      </>
    );
  }
);
export default FunctionCom;
