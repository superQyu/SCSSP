declare module '*.css';
declare module '*.scss';
declare module '*.sass';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.tiff';

declare let BMapGL: any;
declare let BMapGLLib: any;

// 以下是一些通用类型的定义
// 弹窗状态改变
namespace ModalState {
  interface ModalProps<T> {
    state: boolean;
    type?: T;
    detail?: Record<string, any>;
  }
  type ModalStateChange<T> = (props: ModalProps<T>) => void;
}
