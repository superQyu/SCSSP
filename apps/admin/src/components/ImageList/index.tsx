import { Image } from 'antd';

export default ({ value }: any) => {
  console.log('图片列表', value)
  !value && (value = [])
  return (
    <>
      {value.map((item: any, index: number) => (
        <Image key={index} src={item} />
      ))}
    </>
  );
};
