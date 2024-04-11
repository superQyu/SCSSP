import React from 'react';
import { Breadcrumb } from 'antd';

const BreadcrumbCom = (props: { routes: any[] }) => {
  return <Breadcrumb items={props.routes} />;
};

export default BreadcrumbCom;
