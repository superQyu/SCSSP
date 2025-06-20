import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { Form, Input, Selector } from 'antd-mobile';
import { DeleteOutline } from 'antd-mobile-icons';

import UploadImage from '@/pages/phone/components/UploadImage';
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
import PickerPopup from '@/pages/phone/components/PickerPopup';
import { Flex } from 'antd';


interface MaterialBlockProps {
  initialValue: any;
  index: number;
  onDelete: (index: number) => void;
}

const MaterialBlock: React.FC<MaterialBlockProps> = forwardRef(
  ({ index, initialValue, onDelete }, ref) => {
    const { server } = useBasicConfiguration();
    const { materialList: M } = server;
    const childRef = useRef(null);
    const [form] = Form.useForm();
    const [key, setKey] = useState('');
    const [materialOptions, setMaterialOptions] = useState([]);
    const [materialCodeOptions, setMaterialCodeOptions] =
      useState([]);
    const [columns, setColumns] = useState([]);

    const [materialsInventoryId, setMaterialsInventoryId] =
      useState('');

    // 请求物料列表
    const queryMaterialList = async () => {
      const res = await M.getAllMaterialList();
      const list = res.map((item: any) => ({
        label:
          item.materialName + ' ' + (item.specification || ''),
        value: item.id,
        materialInfo: item, // 保存完整的物料信息
      }));
      setMaterialOptions([list]);
      const list2 = res.map((item: any) => ({
        label: item.materialCode,
        value: item.materialCode,
      }));
      setMaterialCodeOptions([list2]);
    };

    const handlePopup = (str: string, form = null) => {
      setKey(str);
      if (str == 'materialName') {
        setColumns(materialOptions);
      } else if (str == 'materialCode') {
        setColumns(materialCodeOptions);
      }
      childRef.current.openModal(true);
    };

    const handleSearch = (str: string) => {
      // setKeyword(str);
      // if (str === 'carNo') {
      //   queryCarNo();
      // } else if (str === 'materialMan') {
      //   queryMaterialMan();
      // } else if (str === 'purchaseUnit') {
      //   queryDepartment();
      // }
    };

    const handleValueSelect = ([value]) => {
      if (key == 'materialName') {
        setMaterialsInventoryId(value);
        const res = materialOptions[0]?.find(
          (item: any) => item.value == value
        );
        const { materialName, measuringUnit, specification } =
          res.materialInfo;

        form.setFieldsValue({
          materialName: materialName || ' ',
          measuringUnit: measuringUnit || ' ',
          specification: specification || ' ',
        });
      } else if (key == 'materialCode') {
        form.setFieldsValue({
          materialCode: value || ' ',
        });
      } else if (key == 'isSpecialWork') {
        form.setFieldsValue({
          isSpecialWork: value || ' ',
        });
      }
    };

    const getFormValues = () => {

      return {
        materialsInventoryId:
          materialsInventoryId ||
          initialValue?.materialsInventoryId,
        ...form.getFieldsValue(),
        isSpecialWork:
          form.getFieldsValue()?.isSpecialWork?.[0] || 0,
          id: initialValue?.id
      };
    };

    useImperativeHandle(ref, () => ({
      getFormValues,
    }));

    useEffect(() => {
      queryMaterialList();
    }, []);

    return (
      <>
        <Form
          layout="horizontal"
          mode="card"
          form={form}
          ref={ref}
          initialValues={{
            ...initialValue,
            isSpecialWork: [initialValue?.isSpecialWork || 0],
          }}
        >
          <Form.Header>
            <Flex align="center" justify="space-between">
              <span>物料{index + 1}</span>
              {index > 0 && (
                <DeleteOutline
                  onClick={() => onDelete(index)}
                  style={{ color: '#f5222d', cursor: 'pointer' }}
                />
              )}
            </Flex>
          </Form.Header>

          <Form.Item
            label="物料名称"
            name="materialName"
            onClick={() => handlePopup('materialName')}
          >
            <Input placeholder="请选择物料名称" />
          </Form.Item>

          <Form.Item label="型号" name="materialType">
            <Input placeholder="请输入型号" />
          </Form.Item>

          <Form.Item label="计量单位" name="measuringUnit">
            <Input placeholder="请选择物料" disabled />
          </Form.Item>

          <Form.Item label="规格" name="specification">
            <Input placeholder="请选择物料" disabled />
          </Form.Item>

          <Form.Item
            label="物料编号"
            name="materialCode"
            onClick={() => handlePopup('materialCode')}
          >
            <Input placeholder="请选择编号" />
          </Form.Item>

          <Form.Item label="是否特种作业" name="isSpecialWork">
            <Selector
              columns={2}
              options={[
                {
                  label: '否',
                  value: 0,
                },
                {
                  label: '是',
                  value: 1,
                },
              ]}
            />
          </Form.Item>

          <Form.Item label="计划进场数量" name="enterNumber">
            <Input placeholder="请输入数量" />
          </Form.Item>

          <Form.Item label="合格证书" name="attachment">
            <UploadImage initialValue={initialValue.attachment} />
          </Form.Item>
        </Form>

        <PickerPopup
          columns={columns}
          handleSearch={handleSearch}
          ref={childRef}
          onSelect={handleValueSelect}
        />
      </>
    );
  }
);

export default MaterialBlock;
