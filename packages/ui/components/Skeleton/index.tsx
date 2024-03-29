import React from 'react';
import { Skeleton, Layout, Flex, Space, Table, Tag, type TableProps } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

const resetStyle: React.CSSProperties = {
  color: '#fff',
  backgroundColor: '#fff',
};

const data = Array.from({ length: 6 }).map((_, i) => ({
  key: i,
}));
const columns: TableProps<{}>['columns'] = Array.from({ length: 4 }).map(() => ({
  title: () => <Skeleton.Input active />,
  render: () => <Skeleton.Input style={{ height: '24px' }} active />,
}));

const CusSkeleton: React.FC = () => {
  return (
    <Flex style={{ height: '100vh' }} gap="middle" wrap="wrap">
      <Layout
        style={{
          borderRadius: 8,
          overflow: 'hidden',
          width: 'calc(100% - 8px)',
          maxWidth: 'calc(100% - 8px)',
        }}
      >
        <Header
          style={{
            ...resetStyle,
            display: 'flex',
            alignItems: 'center',
            height: 64,
            paddingInline: 48,
          }}
        >
          <Skeleton.Avatar
            active
            size="large"
            shape="circle"
            style={{ display: 'flex', margin: '0 1rem 0 0' }}
          />
          <Skeleton.Input active size="default" style={{ width: '14rem', display: 'flex' }} />
        </Header>
        <Layout>
          <Sider width="256" style={{ ...resetStyle, padding: '1rem 0.5rem' }}>
            <Skeleton active />
            <Skeleton active style={{ margin: '1rem 0' }} />
            <Skeleton active />
          </Sider>
          <Layout>
            <Content style={{ minHeight: 120, ...resetStyle, padding: '1rem', textAlign: 'right' }}>
              <Table columns={columns} dataSource={data} pagination={false} />
              <Skeleton.Input
                style={{ marginTop: '1rem', width: '24rem', height: '18px' }}
                active
              />
            </Content>
            <Footer style={{ ...resetStyle }}></Footer>
          </Layout>
        </Layout>
      </Layout>
    </Flex>
  );
};

export default CusSkeleton;
