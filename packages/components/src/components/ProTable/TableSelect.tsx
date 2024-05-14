import React, { useState } from 'react';
import styled from 'styled-components';

import { Select } from 'antd';
import ProTable from './index';

interface Props {
  /** 作为表单传入的值 */
  value?: any;
  /** 改变 value 的方法 */
  onChange?: any;
  /** 表格的相关配置 */
  tableConfig?: any;
  placeholder?: string;
  onClickRow?: any;
}

const MySelect = styled(Select)`
  // display: none;
`;

const TableSelect: React.FC<Props> = (props: Props) => {
  const { value, onChange } = props;

  const [open, setOpen] = useState(false);

  const dropdownRender = () => (
    <ProTable
      // {...props.tableConfig}
      // rowKey="key"
      // actionRef={firstTableRef}
      // headerTitle="证件列表"
      columns={props.tableConfig.columns}
      params={props.tableConfig.params}
      request={props.tableConfig.request}
      form={{
        ...props.tableConfig.form,
        ignoreRules: false,
      }}
      scroll={{ y: 'auto' }}
      search={props.tableConfig.search}
      toolBarRender={false}
      pagination={props.tableConfig.pagination}
      onRow={(record: any) => {
        return {
          onClick: () => {
            const label = props.tableConfig.onClickRow(record);
            onChange(label);
            setOpen(false);
          },
        };
      }}
    />
  );

  return (
    <MySelect
      // style={{ minWidth: '280px' }}
      // ref={selectRef}
      popupClassName="1111111"
      dropdownStyle={{ height: '500px' }}
      value={props.value}
      open={open}
      onDropdownVisibleChange={(visible) => setOpen(visible)}
      popupMatchSelectWidth={600}
      placeholder={props.placeholder || '请选择'}
      dropdownRender={dropdownRender}
      optionRender={(option, info) => {
        console.log('option', option, info);
        return <div>111</div>;
      }}
    />
  );
};

export default TableSelect;
