import React from 'react';
import { Breadcrumb } from 'antd';

export default (props: { routes: any[] }) => {
  const defRoutes = [
    {
      title: 'Home',
    },
    {
      title: <a href="">Application Center</a>,
    },
    {
      title: <a href="">Application List</a>,
    },
    {
      title: 'An Application',
    },
  ];
  return <Breadcrumb style={{ lineHeight: '40px' }} items={props.routes || defRoutes} />;
};
