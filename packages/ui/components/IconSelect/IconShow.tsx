import React from 'react';

import { Avatar } from 'antd';
import { iconList } from './IconMap';

interface IconShowProp {
  ico?: string;
  handlerIco?: any;
}

const IconShow = ({ ico, handlerIco }: IconShowProp) => {
  if (!ico || ico == '') return <></>;
  
  if (typeof ico == 'object') return ico;
  
  const iconInfor = ico.split(':');
  const [key, iconName]: string[] = iconInfor.length === 1 ? ['ad', ...iconInfor] : iconInfor;

  if (ico.indexOf('.') != -1)
    return <Avatar size={18} src={<img src={`/static${ico}`} alt="avatar" />} />;

  const curIcon = iconList[key].filter(([name]: [string]) => {
    return iconName === name;
  });
  if (!curIcon.length) return <></>;

  return <>{key == 'ad' ? React.createElement(curIcon[0][1]) : <></>}</>;
};

export default IconShow;
