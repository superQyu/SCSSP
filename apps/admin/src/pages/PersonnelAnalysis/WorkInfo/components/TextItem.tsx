import { Flex } from 'antd';

interface Props {
  label: string;
  value: number;
  unit: string;
}

export default ({ label, value, unit }: Props) => {
  return (
    <Flex align="center" className="px-3 h-38px font-size-14px color-#888888 bg-#f5f8fa border-rd-4px">
      <div className="flex-1">{label}</div>
      <div className="font-size-24px font-700 color-#0080FF px-2">{value}</div>
      <div>{unit}</div>
    </Flex>
  );
};
