import React, { useEffect, useState } from 'react';
import { ImageUploader } from 'antd-mobile';

import { ImageUploadItem } from 'antd-mobile/es/components/image-uploader';
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

// 基础用法
export default ({ onChange, initialValue = '' }: any) => {
  const { server } = useBasicConfiguration();
  const { file } = server;
  const [fileList, setFileList] = useState<ImageUploadItem[]>(
    []
  );

  const handleUpload = async (params: any) => {
    const formData = new FormData();
    formData.append('file', params);
    const res = await file.fileUpload(formData);

    setFileList([
      ...fileList,
      {
        url: res,
      },
    ]);

    return {
      url: res,
    };
  };

  const onDelete = ({ url }: any) => {
    const newList = fileList.filter((item) => item.url != url);
    setFileList(newList);
  };

  useEffect(() => {
    if (initialValue) {
      setFileList(
        initialValue.split(',').map((item) => {
          return {
            url: item,
          };
        })
      );
    }
  }, [initialValue]);

  useEffect(() => {
    onChange(fileList.map((item) => item.url).join(','));
  }, [fileList]);

  return (
    <ImageUploader
      value={fileList}
      onDelete={onDelete}
      upload={handleUpload as any}
    />
  );
};
