import {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from 'react';
import { Input, Picker } from 'antd-mobile';

const PickerPopup = forwardRef((props: any, ref) => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [columns, setColumns] = useState(props.columns);
  const [value, setValue] = useState<(string | null)[]>(['']);

  useEffect(() => {
    setColumns(props.columns);
  }, [props.columns]);

  useImperativeHandle(ref, () => ({
    openModal: (openModal: boolean) =>
      setPopupVisible(openModal),
    // 可选：添加获取当前值的方法
    getSelectedValue: () => value,
  }));

  // 处理选择确认
  const handleConfirm = (selectedValue) => {
    setValue(selectedValue);
    setPopupVisible(false);

    // 调用父组件的回调函数传递选择的值
    if (typeof props.onSelect === 'function') {
      props.onSelect(selectedValue);
    }
  };

  return (
    <Picker
      title={
        <Input
          placeholder="请输入关键字"
          onBlur={(target) => {
            // 搜索逻辑可以在这里实现
          }}
        />
      }
      columns={columns}
      visible={popupVisible}
      onClose={() => {
        setPopupVisible(false);
      }}
      onConfirm={handleConfirm}
    />
  );
});

export default PickerPopup;
