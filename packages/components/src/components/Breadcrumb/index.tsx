import React from 'react';
import { Breadcrumb } from 'antd';

export default (props: { routes: any[] }) => {
  return <Breadcrumb style={{ lineHeight: '40px' }} items={props.routes} />;
};
