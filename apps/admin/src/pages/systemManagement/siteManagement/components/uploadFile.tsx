import React, { forwardRef, useState, useImperativeHandle } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
// import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const UploadFileCom: React.FC = (props, ref) => {
  // const { server } = useBasicConfiguration();
  // const { basic: B } = server;
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const settings = {
    maxNo: 3,
    ...props,
  };

  const handleUpload = () => {
    if (!fileList.length) return;
    // console.log('fileList', fileList);
    // return;
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('file', file as FileType);
    });

    fetch('http://192.168.10.77:48081/admin-api/infra/file/upload', {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: 'Bearer b1552bac990444e9bd76dae8a8323b60'
      },
    })
      .then((res) => res.json())
      .then((res) => {
        props.callback && props.callback(res.data);
      });
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList, file }) => {
    const isDeleted = fileList.length > newFileList.length;
    setFileList(newFileList);
    !isDeleted && handleUpload();
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>点击上传头像</div>
    </button>
  );

  // 重置所有
  const resetAll = () => {
    setFileList([]);
  };

  useImperativeHandle(ref, () => ({
    resetAll,
  }));

  return (
    <>
      <Upload
        onRemove={(file) => {
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);
          setFileList(newFileList);
        }}
        beforeUpload={(file) => {
          setFileList([...fileList, file]);
          return false;
        }}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= settings.maxNo ? null : uploadButton}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

export default forwardRef(UploadFileCom);
