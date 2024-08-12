import React, { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload, Button, message } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';

type FileType = Parameters<
  GetProp<UploadProps, 'beforeUpload'>
>[0];

export type RequestData<T> =
  | ({
      data: T[] | undefined;
      success?: boolean;
      total?: number;
    } & Record<string, any>)
  | string;

interface Props {
  /** 文件上传的提示 */
  tip?: string;
  /** 自定义上传按钮  */
  buttonRender?: JSX.Element;
  /** 上传接口配置  */
  onRequest?: (
    params: any
  ) => Promise<Partial<RequestData<any>>>;
  /** 上传成功  */
  onUploadSuccess?: (params: any, path: string) => void;
  /** 上传失败 */
  onUploadError?: (params?: any) => void;
  /** 文件删除 返回file对象 */
  onDeleted?: (file: any) => void;
  /** 文件上传类型  默认  ['image/jpeg', 'image/png']*/
  fileType?: string[];
  /** 文件上传大限制 默认 20M*/
  fileSize?: number;
  /** 文件上传个数 默认 上限8个 */
  // maxCount?: number | false;
  maxCount?: number;
  /** 是否显示上传列表 */
  showUploadList?: boolean;
  // 预先已有的图片列表
  defaultFileList?: () => (UploadFile & { url?: string })[];
  // 文件列表发生改变，取代上传成功和删除
  onListChange?: (params: any) => void;
  /** 是否显示上传按钮 */
  showUploadButton?: boolean;
}

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const ProUpload: React.FC<Props> = (props: Props) => {
  const {
    buttonRender,
    onRequest,
    onUploadSuccess,
    onUploadError,
    onDeleted,
    fileType = ['jpeg', 'png', 'image/jpeg', 'image/png'],
    fileSize = 20,
    maxCount = 8,
    showUploadList = true,
    showUploadButton = true,
    defaultFileList = () => [],
    onListChange,
  } = props;

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [fileList, setFileList] = useState<
    (UploadFile & { url?: string })[]
  >(defaultFileList());

  const [tempFileUid, setTempFileUid] = useState<string>('');

  useEffect(() => {
    // console.log('新的文件列表', fileList);
    onListChange && onListChange(fileList);
  }, [fileList]);

  const customRequest = async ({
    file,
    onSuccess,
    onError,
  }: Record<string, any>) => {
    if (onRequest) {
      try {
        const formData = new FormData();
        formData.append('file', file as FileType);

        const res = await onRequest(formData);

        console.log('res', res);

        onUploadSuccess &&
          onUploadSuccess(
            {
              [file.uid]: {
                url: res,
                name: file.name,
              },
            },
            `${res}`
          );
        // 修改 fileList, 统一走 useEffect
        const newFile: UploadFile & { url?: string } = {
          uid: file.uid,
          name: file.name,
          url: res as string,
        };
        setFileList([...fileList, newFile]);

        message.success('上传成功！');
        onSuccess();
      } catch (error) {
        message.error('上传失败!');
        onUploadError && onUploadError(file);
        onError();
      }
    } else {
      onSuccess();
    }
  };

  const beforeUpload = async (file: any) => {
    setTempFileUid(file.uid);
    const isJpgOrPng = fileType.indexOf(file.type) != -1;
    if (!isJpgOrPng) {
      message.error(`只能上传${fileType.join(',')}文件！`);
    }

    const isLt2M = file.size / 1024 / 1024 < fileSize;
    if (!isLt2M) {
      message.error(`文件不能超过 ${fileSize}MB!`);
    }

    if (isJpgOrPng && isLt2M) setTempFileUid('');
    return isJpgOrPng && isLt2M;
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(
        file.originFileObj as FileType
      );
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps['onChange'] = ({
    fileList: newFileList,
  }) => {
    // setFileList(newFileList);
  };

  const onRemove = (file: UploadFile) => {
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);
    setFileList(newFileList);
    onDeleted && onDeleted(file);
  };

  const delErrorFile = (files: UploadFile[]) =>
    files.map((file: UploadFile) => onRemove(file));

  const uploadProps: UploadProps = {
    listType: buttonRender ? 'text' : 'picture-card',
    onRemove,
    beforeUpload,
    fileList,
    onPreview: handlePreview,
    onChange: handleChange,
    customRequest,
    showUploadList,
  };

  useEffect(() => {
    if (tempFileUid && tempFileUid != '') {
      delErrorFile(
        fileList.filter((file) => file.uid == tempFileUid)
      );
    }
  }, [fileList]);

  const uploadButton = buttonRender || (
    <Button
      style={{ border: 0, background: 'none' }}
      type="text"
    >
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>上传</div>
      {props.tip && (
        <div style={{ marginTop: 20 }}>{props.tip}</div>
      )}
    </Button>
  );

  return (
    <>
      <Upload {...uploadProps}>
        {!maxCount && showUploadButton
          ? uploadButton
          : fileList?.length >= maxCount || !showUploadButton
          ? null
          : uploadButton}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) =>
              setPreviewOpen(visible),
            afterOpenChange: (visible) =>
              !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

export default ProUpload;
