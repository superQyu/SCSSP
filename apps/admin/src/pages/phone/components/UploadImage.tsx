import React, { useState } from 'react';
import type { FC } from 'react';
import {
  ImageUploader,
  Space,
  Toast,
  Dialog,
} from 'antd-mobile';
import { DemoBlock, DemoDescription } from 'demos';
import { ImageUploadItem } from 'antd-mobile/es/components/image-uploader';
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
const demoSrc =
  'https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60';

async function mockUpload(file: File) {}

// 基础用法
export default () => {
  const { server } = useBasicConfiguration();
  const { file } = server;
  const [fileList, setFileList] = useState<ImageUploadItem[]>(
    []
  );

  const handleUpload = async (params) => {
    console.log(params);
    const res = await file.fileUpload({
      file:params
    });
    console.log(res);
  };

  return (
    <ImageUploader
      value={fileList}
      onChange={setFileList}
      upload={handleUpload as any}
    />
  );
};
