import { useEffect, useRef, useState } from 'react';
import { List, Spin } from 'antd';
import styled from 'styled-components';

import { getNowDate } from '@/utils/common';
import { setToken } from 'utils';
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
import stop from '@/assets/images/video/stop.png';
import play from '@/assets/images/video/play.png';

const CustomSDiv = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  .play {
    width: 16px;
    height: 16px;
    margin-right: 10px;
    border-radius: 50%;
    background: no-repeat left center;
    background-image: url(${play});
  }
  .stop {
    width: 16px;
    height: 16px;
    margin-right: 10px;
    border-radius: 50%;
    background: no-repeat left center;
    background-image: url(${stop});
  }
`;
export default ({ onSelect }: any) => {
  const { server, config } = useBasicConfiguration();
  const { monitor, PMPM } = server;

  const [loading, setLoading] = useState<boolean>(true);
  const [treeData, setTreeData] = useState<any[]>();
  const [activeIdx, setActiveIdx] = useState<number>(0);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    let list;
    const login = await monitor.login();
    setToken('monitor_token', login.token);
    await askCameraList((res: any) => {
      list = getPersonelList(res.filter((item:any)=> item.equipStatus == '1'));
      if (list.length) {
        setActiveIdx(0);
        onSelect(list?.[0].code);
      }
      setTreeData(list);
      setLoading(false);
    });
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

  return (
    <>
      <Spin
        tip="监控列表获取中"
        spinning={loading}
        wrapperClassName="w-full h-full"
      >
        <List
          itemLayout="horizontal"
          dataSource={treeData}
          split={false}
          renderItem={(item, index) => (
            <List.Item
              onClick={() => {
                setActiveIdx(index);
                onSelect(item.code);
              }}
            >
              <CustomSDiv>
                <div
                  className={
                    activeIdx == index ? 'play' : 'stop'
                  }
                ></div>
                {item.valueMean}
              </CustomSDiv>
            </List.Item>
          )}
        />
      </Spin>
    </>
  );
};
