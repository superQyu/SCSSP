import React, {
  cloneElement,
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { Modal, Image } from 'antd';
import type { DescriptionsProps } from 'antd';
import type { FormInstance } from 'antd/es/form';
import dayjs from 'dayjs';
import { ProDescriptions } from 'components';
import SingleTitle from '@/components/SingleTitle';
import DictSelect from '@/components/DictSelect';

interface Props {
  /** 表单初始化 */
  subForm: {};
  /** 监听Modal状态变化 */
  onStateChange?: (state: boolean) => void;
}

const DetailForm: React.FC<Props> = forwardRef(
  ({ subForm }: Props, ref) => {
    const formRef = useRef<FormInstance>(null);
    const [title] = useState<string>('详情');
    const [open, setOpen] = useState<boolean>(false);
    const [desItems, setDesItems] = useState<
      DescriptionsProps['items']
    >([]);
    const columns = [
      {
        label: '编号',
        key: 'id',
        span: 1,
      },
      {
        label: '用户名',
        key: 'carNo',
        span: 1,
      },
      {
        label: '日期',
        key: 'carColor',
        span: 2,
      },
      {
        label: '次数',
        key: 'carColor',
        span: 2,
      },
    ];

    const handleCancel = () => {
      setOpen(false);
      formRef.current?.resetFields();
    };

    const initData = () => {
      const temps = columns.map((item) => {
        const { key, childItem, childItemProps } = item;
        let res = subForm[key];
        let newProps = {};
        if (childItemProps) {
          res = childItemProps(res);
        }
        if (childItem) {
          newProps = {
            ...childItem?.props,
            ...res,
          };
        }
        return {
          ...item,
          children: childItem
            ? cloneElement(childItem, newProps)
            : res,
        };
      });
      setDesItems(temps);
    };

    useEffect(() => {
      initData();
    }, [subForm]);

    useImperativeHandle(ref, () => ({
      openModal: (openModal: boolean) => setOpen(openModal),
    }));

    return (
      <Modal
        width={'50%'}
        open={open}
        title={title}
        maskClosable={false}
        onCancel={handleCancel}
      >
        <ProDescriptions
          column={2}
          items={desItems}
          bordered={true}
        />
      </Modal>
    );
  }
);
export default DetailForm;
