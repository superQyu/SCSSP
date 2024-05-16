import Header from './components/header';
import OutletLayoutRouter from './components/OutletLayoutRouter';
import Layout from './components/Layout';
import { MenuItem } from './components/Layout/layout';

import Text from './components/Text';
import Breadcrumb from './components/Breadcrumb';
import TabCom from './components/TabCom';

import PageContainer from './components/PageContainer';
import ProTable from './components/ProTable';
import EditTable from './components/ProTable/EditTable';
import ProForm from './components/ProForm';
import AdForm, { FormColumnsTypes, FornPropsTypes } from './components/ProForm/form';

import ProUpload from './components/ProUpload';

import ProTree, { TreeNodes, CheckedsType } from './components/ProTree';
import TreeSelect from './components/ProTree/TreeSelect';

import ProSelect from './components/ProSelect';
import SearchSelect from './components/ProSelect/SearchSelect';
export {
  Header,
  OutletLayoutRouter,
  Layout,
  Text,
  PageContainer,
  ProTable,
  // TableSelect,
  EditTable,
  ProForm,
  AdForm,
  Breadcrumb,
  TabCom,
  ProTree,
  TreeSelect,
  ProUpload,
  ProSelect,
  SearchSelect
};
// 组件通用类型
export type { MenuItem, FormColumnsTypes, FornPropsTypes };
export type { TreeNodes, CheckedsType };


