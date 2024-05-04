import React, { useEffect, useState } from 'react';
import { Input } from 'antd';

export interface JsonEditorTypes {
  defaultParams?: any;
  disabled?: boolean;
  [key: string]: any;
}

const JsonEditor: React.FC<JsonEditorTypes> = ({
  defaultParams,
  onChange,
  disabled,
}: JsonEditorTypes) => {
  const [jsonData, setJsonData] = useState('{}');
  const [error, setError] = useState('');

  const handleChange = (e: any) => {
    const content = e.target.value;
    try {
      // 尝试解析JSON数据
      JSON.parse(content);
      setError('');
      setJsonData(content); // 更新JSON数据
      onChange && onChange(JSON.parse(content));
    } catch (e) {
      setError('Invalid JSON'); // 设置错误信息
    }
  };

  const GetDefaultValue = () => {
    return typeof defaultParams == 'string'
      ? defaultParams
      : JSON.stringify(defaultParams, (_, value) => value, 4);
  };

  return (
    <div>
      <Input.TextArea
        disabled={disabled}
        defaultValue={GetDefaultValue()}
        onChange={handleChange}
        placeholder="请输入JSON"
        rows={10}
        status={error == '' ? '' : 'error'}
      />
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default JsonEditor;
