import React, { useEffect, useState, useRef } from 'react';

import { Input, Select, Tabs, Card, Pagination, Space, Tag, Dropdown } from 'antd';
import type { TabsProps, PaginationProps } from 'antd';
import { AimOutlined } from '@ant-design/icons';
import { iconList } from './IconMap';

import IconShow from './IconShow';

interface Umlimit {
  [key: string]: any;
}
interface IconSelectProp extends Umlimit {
  onChange?: (name: string, key?: string) => void;
  /** 显示模式 simple:简约 */
  model?: 'simple' | undefined;
}

const IconSelect: React.FC<IconSelectProp> = (props: IconSelectProp) => {
  const { value, onChange, model } = props; //value 是form表单中"name"对应的字段值
  const selectRef = useRef(null);
  const [tabsActive] = useState<string>('ad');

  //   分页设置
  const [current, setCurrent] = useState<number>(1);
  const [pageSize] = useState<number>(100);
  const [list, setList] = useState<any>(iconList[tabsActive]);
  const [total, setTotal] = useState<number>(list.length);

  const onPaginChange: PaginationProps['onChange'] = (page) => setCurrent(page);
  const searchInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setList(
      value == '' || !value
        ? iconList[tabsActive]
        : iconList[tabsActive].filter(([name, _]: [string, any]) =>
            name.toLowerCase().startsWith(value.toLowerCase())
          )
    );
  };
  const handlerIco = (name: string) => {
    onChange && onChange(`${name}`, name == '' ? '' : tabsActive);
  };
  useEffect(() => {
    setTotal(list.length);
  }, [list]);

  // ant-design/icons
  const AntdIcons = () => {
    return (
      <Card style={{ minWidth: '300px', height: '260px', overflow: 'auto' }}>
        {list
          .slice(pageSize * (current - 1), current * pageSize)
          .map(([name, _]: any, index: string) => (
            <Card.Grid
              key={name}
              style={{
                width: '20%',
                textAlign: 'center',
                padding: '6px',
                cursor: 'pointer',
                fontSize: '22px',
              }}
              onClick={() => handlerIco(name)}
            >
              {React.createElement(_)}
            </Card.Grid>
          ))}
      </Card>
    );
  };
  const items: TabsProps['items'] = [
    {
      key: 'ad',
      label: 'ant-design/icons',
    },
  ];

  // 自定义下拉菜单
  const dropdownRender = () => (
    <>
      <Input placeholder="搜索图标" onChange={searchInputChange} allowClear />
      <Tabs
        defaultActiveKey="ad"
        items={items}
        onChange={onChange}
        indicator={{ size: (origin) => origin - 20, align: 'center' }}
      />
      <AntdIcons />
      <Pagination
        total={total}
        onChange={onPaginChange}
        size="small"
        pageSize={pageSize}
        showSizeChanger={false}
        style={{ marginTop: '1rem' }}
      />
    </>
  );

  return (
    <Space.Compact style={{ width: '100%' }}>
      {model == 'simple' ? (
        <Dropdown
          menu={{ items: [] }}
          dropdownRender={dropdownRender}
          arrow
          overlayStyle={{ maxWidth: '320px', backgroundColor: '#fff' }}
        >
          <Tag
            icon={!value || value == '' ? <AimOutlined /> : <IconShow ico={value} handlerIco />}
            style={{ display: 'flex', fontSize: '22px', padding: '3px 7px', cursor: 'pointer' }}
          />
        </Dropdown>
      ) : (
        <>
          <Tag
            icon={!value || value == '' ? <AimOutlined /> : <IconShow ico={value} handlerIco />}
            style={{ display: 'flex', width: '34px', fontSize: '20px' }}
          />
          <Select
            style={{ minWidth: '280px' }}
            ref={selectRef}
            value={value}
            dropdownRender={dropdownRender}
          />
        </>
      )}
    </Space.Compact>
  );
};

export default IconSelect;
