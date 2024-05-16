import Header from './components/header';
import OutletLayoutRouter from './components/OutletLayoutRouter';
import Layout from './components/Layout';
import { MenuItem } from './components/Layout/layout';

import Text from './components/Text';
import Breadcrumb from './components/Breadcrumb';
import TabCom from './components/TabCom';

import PageContainer from './components/PageContainer';
import ProTable from './components/ProTable';
// import TableSelect from './components/ProTable/TableSelect';
import ProForm from './components/ProForm';
import AdForm, { FormColumnsTypes, FornPropsTypes } from './components/ProForm/form';

import ProUpload from './components/ProUpload';

import ProTree, { TreeNodes, CheckedsType } from './components/ProTree';
import TreeSelect from './components/ProTree/TreeSelect';

import ProSelect from './components/ProSelect';
import SearchSelect from './components/ProSelect/SearchSelect';

import ProDescriptions from'./components/ProDescriptions'
export {
  Header,
  OutletLayoutRouter,
  Layout,
  Text,
  PageContainer,
  ProTable,
  // TableSelect,
  ProForm,
  AdForm,
  Breadcrumb,
  TabCom,
  ProTree,
  TreeSelect,
  ProUpload,
  ProSelect,
  SearchSelect,
  ProDescriptions
};


// 组件通用类型
export type { MenuItem, FormColumnsTypes, FornPropsTypes };
export type { TreeNodes, CheckedsType };


