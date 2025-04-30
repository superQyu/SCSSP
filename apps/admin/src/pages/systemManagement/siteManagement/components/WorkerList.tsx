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

interface Props {
  /** 表单初始化 */
  subForm: Record<string, any>;
  /** 编辑时的证书详情 */
  detail?: Record<string, any>;
  onSelect?: any;
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
  ({ subForm, detail, onSelect }: Props, ref) => {
    const { server } = useBasicConfiguration();
    const { file: F, basic: B, person: P, certificate } = server;

    const [options, setOptions] = useState([]);
    const [curVal, setCurVal] = useState<string>('');
    const [ifCertificate, setIfCertificate] =
      useState<boolean>(false);

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
            value: item.id,
            danger: item.isSpecialWorkType,
          };
        });
      }
      setOptions(options);
    };

    // 选择工种
    const workTypeClick = ({ value = '', danger = false }) => {
      setCurVal(value);
      setIfCertificate(danger);
      onSelect(value);
      // console.log('当前选择的工种', functionKey, value);
    };

    useEffect(() => {
      // setOpen(true);
      // setOpen(false);
      init('workTypeId');
    }, []);

    useEffect(() => {
      // setOpen(true);
      // setOpen(false);
      if (subForm?.workerType) {
        const key =
          subForm.workerType == '2'
            ? 'jobCategory'
            : 'workTypeId';
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
      }
    }, [detail]);

    useImperativeHandle(ref, () => ({
      // form: formRef.current,
      // resetAll,
      ifCertificate,
    }));

    return (
      <div className="h-200px overflow-auto">
        <Flex wrap="wrap" gap="middle">
          {options.map((item: workTypeItem) => {
            return (
              <Button
                key={item.value}
                type="default"
                danger={item.danger || false}
                style={
                  curVal == item.value
                    ? {
                        color: '#379E04',
                        background: 'rgba(103,194,58,0.2',
                        border: 'none',
                      }
                    : {}
                }
                onClick={() => workTypeClick(item)}
              >
                {item.label}
              </Button>
            );
          })}
        </Flex>
      </div>
    );
  }
);
export default FunctionCom;
