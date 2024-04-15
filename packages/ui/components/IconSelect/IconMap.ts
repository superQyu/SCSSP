import * as Icons from '@ant-design/icons';

interface IconMap {
  [key: string]: any;
}

const iconMap: IconMap = Icons as unknown as IconMap;

export const iconList: IconMap = {
  ad: Object.entries(iconMap).filter(([n, c]) => {
    return n != 'default' && typeof c != 'function';
  }),
};
