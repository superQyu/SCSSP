import { useEffect, useRef, useState } from 'react';

import { ProTable } from 'components';
import { type ActionType } from '@ant-design/pro-components';
import { Button, message, Tree, Spin } from 'antd';
import type { TreeDataNode } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import EditDialog from './components/editdialog';
import { getNowDate } from '@/utils/common';

import { TOKEN, getToken, setToken } from 'utils';

// api 相关
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
// 表格相关
import siteModel from './models/table.model';

const updateTreeData = (
  list: any[],
  key: React.Key,
  children: any[]
): any[] =>
  list.map((node) => {
    if (node.key === key) {
      return {
        ...node,
        children,
      };
    }
    if (node.children) {
      return {
        ...node,
        children: updateTreeData(node.children, key, children),
      };
    }
    return node;
  });

export default ({ onSelect }: any) => {
  // api 相关
  const { server, config } = useBasicConfiguration();
  const { monitor, PMPM } = server;
  const { PROJECTNAME } = config || {};

  const [loading, setLoading] = useState<boolean>(true);
  const [treeData, setTreeData] = useState<any[]>();
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>(
    []
  );

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    let list;
    const login = await monitor.login();
    setToken('monitor_token', login.token);
    await askCameraList((res: any) => {
      console.log('处理后的监控列表', res);
      list = getPersonelList(res);
    });
    console.log('最终需要渲染的监控列表', list);
    const project = await PMPM.getProjectUnity({
      id: getToken(PROJECTNAME),
    });
    console.log('当前项目信息', project);
    setTreeData([
      {
        valueMean: project.projectInfoRespVO.projectName,
        id: '0-0',
        children: list,
      },
    ]);
    setLoading(false);
    setExpandedKeys(['0-0']);
  };
  //请求摄像头
  const askCameraList = async (callback: any) => {
    let _date = getNowDate().split('-');

    var date = new Date(`${_date[0]}-${_date[1]}-${_date[2]}`);
    var newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + +-2
    );
    var Y = newDate.getFullYear();
    var M = newDate.getMonth() + 1;
    M = M < 10 ? '0' + M : M;
    var D = newDate.getDate();
    D = D < 10 ? '0' + D : D;

    const res1 = await monitor.cameraList({
      // projectNo: getToken(PROJECTNAME),
      projectNo: 'Q10006',
      pageNo: 1,
      pageSize: 100,
      beginDate: `${Y}-${M}-${D}`,
      endDate: `${_date[0]}-${_date[1]}-${_date[2]}`,
    });
    const res2 = await monitor.cameraList({
      // projectNo: getToken(PROJECTNAME),
      projectNo: 'Q10006',
      pageNo: 1,
      pageSize: 100,
      beginDate: `${Y}-${M}-${D}`,
      endDate: `${_date[0]}-${_date[1]}-${_date[2]}`,
      isRemoved: 1,
    });
    //     // 摄像头点位
    // res.records = [ ];
    let aArr = [];
    [...res1.records, ...res2.records].forEach((oItem, i) => {
      // temp 添加一个坐标为了点击可以跳出地图弹框
      if (oItem.isRemoved == 1 || !oItem.lat) {
        oItem.lat = -73.963138;
        oItem.lng = 40.864645;
      }
      aArr.push({
        ...oItem,
        no: i + 1,
      });
    });
    // Bus.$emit('cameraList', aArr);
    callback && callback(aArr);
  };
  const getPersonelList = (obj: any[]) => {
    let arry = new Array();
    obj.forEach((element, index) => {
      let errorList = element.list || [];
      let error = true;
      if (errorList.length <= 0) {
        error = false;
      } else {
        var num = 0;
        for (var i = 0; i < errorList.length / 2; i++) {
          num += errorList[i].clipsTime;
        }
        if (num > 2880) {
          error = true;
        } else {
          error = false;
        }
      }

      let temp = {
        id: element.id,
        time: element.activationTime,
        valueMean: element.no + '. ' + element.cameraName,
        code: element.cameraIndexcode,
        status: element.equipStatus,
        error: error,
        isRemoved: element.isRemoved === '1',
      };

      if (element.projectNo == 'Q10006') {
        arry.push(temp);
      }
    });

    return arry;
  };

  // const onLoadData = ({ key, children }: any) =>
  //   new Promise<void>(async (resolve) => {
  //     let list: any;
  //     const login = monitor.login();
  //     setToken('monitor_token', login.token);
  //     await askCameraList((res: any) => {
  //       console.log('处理后的监控列表', res);
  //       list = getPersonelList(res);
  //     });
  //     console.log('最终需要渲染的监控列表', list);
  //     if (children) {
  //       resolve();
  //       return;
  //     }
  //     setTreeData((origin) => updateTreeData(origin, key, list));

  //     resolve();
  //   });

  return (
    <>
      <Spin
        tip="监控列表获取中"
        spinning={loading}
        wrapperClassName="w-full h-full"
      >
        <Tree
          expandedKeys={expandedKeys}
          treeData={treeData}
          // loadData={onLoadData}
          onSelect={(selectedKeys, e) => {
            // console.log('selectedKeys', selectedKeys, e.node);
            if (e.node?.code) onSelect(e.node?.code);
            else return;
          }}
          fieldNames={{
            title: 'valueMean',
            key: 'id',
          }}
        />
      </Spin>
    </>
  );
};
