import { Flex } from 'antd';

interface Props {
  label: string;
  color: string;
}

export default ({ label, color }: Props) => {
  return (
    <Flex align="center" className="px-3 h-38px font-size-14px color-#888888 bg-#f5f8fa">
      <div className="w-10px h-10px border-rd-50% mr-2" style={{ background: color }}></div>
      <div className="flex-1">{label}</div>
    </Flex>
  );
};
