import { useRef, useEffect, useState } from 'react';
import { Alert, Col, Row, Input, Typography } from 'antd';

import MapServer, { AutoComplete } from '@/components/React-BMapGL';

// import * as CusMapServer from 'react-bmapgl';

import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

import withWebSocket from '@/context/WithWebSocket';

interface Unlimit {
  [key: string]: any;
}

export default withWebSocket(({ socket }) => {
  const { server } = useBasicConfiguration();
  const CHANNEL = 'car_track';

  const mapRef = useRef(null);
  const [latlng, setLatlng] = useState<string[]>([]);
  const [center, setCenter] = useState<Unlimit>({
    lng: 120.31224857818925,
    lat: 31.495985112865068,
  });
  const [markers, setMarkers] = useState<Unlimit[]>([]);

  const animationRef = useRef<number>(-1);
  const [points, setPoints] = useState<Unlimit[]>([]);
  const [animatedPoints, setAnimatedPoints] = useState<Unlimit[]>([]);

  const handleMapClick = (latlng: Unlimit) => {
    setLatlng([latlng.lng, latlng.lat]);
    setMarkers([
      {
        position: latlng,
        icon: 'loc_red', //'loc_red' | 'loc_blue' | 'start' | 'end' | 'location'
        enableDragging: false, // true | false (默认)
        isTop: true, //是否将标注置于其他标注之上。默认情况下纬度低盖住纬度高的标注
        autoViewport: false,
        offset: { width: 0, height: -22 },
      },
    ]);
  };

  const handlerSocketMessage = ({ data }: Unlimit) => {
    const { type, content } = JSON.parse(data) as { type: string; content: any };
    if (type === CHANNEL) {
      const p = JSON.parse(content).map((item: Unlimit) => {
        const [lng, lat] = item.point.split(',');
        return { lng: lng * 1, lat: lat * 1 };
      });
      console.log(p);
      setPoints([...points, p]);
    }
  };
  // // 模拟实时更新的轨迹点数据
  useEffect(() => {
    // socket && (socket.onmessage = handlerSocketMessage);
  }, [socket]);

  // 模拟轨迹线的绘制动画
  // useEffect(() => {
  //   let index = 0;
  //   const animate = () => {
  //     if (index < points.length) {
  //       setAnimatedPoints([...animatedPoints, points[index]]);
  //       index++;
  //       animationRef.current = requestAnimationFrame(animate);
  //     }
  //   };

  //   animationRef.current = requestAnimationFrame(animate);

  //   return () => cancelAnimationFrame(animationRef.current);
  // }, [points]);

  return (
    <>
      <Alert
        message={'百度地图，有任何问题联系我！'}
        type="success"
        style={{ marginBlockEnd: '15px' }}
        showIcon
      />
      <Row gutter={16} style={{ height: '100%' }}>
        <Col span={12}>
          <Row style={{ marginBlockEnd: '15px' }}>
            <Col span={8}>
              <Input addonBefore="纬度:" value={latlng[0]} />
            </Col>
            <Col span={8}>
              <Input addonBefore="经度:" value={latlng[1]} />
            </Col>
          </Row>

          <div style={{ position: 'relative', height: 'calc(100% - 95px)' }}>
            {/* <input id="ac" /> */}
            <AutoComplete
              // input="ac"
              style={{ marginBlockEnd: '10px', width: '100%' }}
              onConfirm={(e: Unlimit) => {
                const geocoder = new BMapGL.Geocoder();
                console.log(e.item.value.business);

                // 执行反向地理编码
                geocoder.getPoint(e.item.value.business, function (locationResult: any) {
                  if (locationResult) {
                    const { lng, lat } = locationResult;
                    console.log(`坐标：(${lng}, ${lat})`);
                    // setCenter({ lng, lat });
                  } else {
                    // console.error('无法获取地点坐标');
                  }
                });
              }}
              onSearchComplete={(e: Unlimit) => {}}
            />
            <MapServer
              center={{ ...center }}
              style={{ height: 'calc(100% - 50px)' }}
              zoom={18}
              onClick={handleMapClick}
              Marker={{
                //添加标记点
                show: true,
                markers: [...markers],
                // onClick: (e: Event) => {},
                // onMouseout: (e: Event) => {},
                // onMouseover: (e: Event) => {},
              }}
              Polygon={{
                //多边形
                show: false,
                path: [
                  new BMapGL.Point(116.35, 39.88),
                  new BMapGL.Point(116.4, 39.92),
                  new BMapGL.Point(116.33, 40.01),
                ],
                // onClick: (e: Event) => {},
                // onMouseout: (e: Event) => {},
                // onMouseover: (e: Event) => {},
                options: {
                  autoViewport: true, //是否默认聚焦
                  strokeColor: '#f00', //	描边的颜色，同CSS颜色
                  strokeWeight: 2, //	描边的宽度，单位为像素
                  fillColor: '#ff0', //	面填充颜色，同CSS颜色
                  fillOpacity: 0.3, //面填充的透明度，范围0-1
                  enableEditing: false, //开启可编辑模式
                },
              }}
              Polyline={{
                //折线
                show: true,
                path: [
                  new BMapGL.Point(120.303209, 31.496065),
                  new BMapGL.Point(120.305401, 31.495757),
                ],
                // onClick: (e: Event) => {},
                // onMouseout: (e: Event) => {},
                // onMouseover: (e: Event) => {},
                options: {
                  autoViewport: false, //是否默认聚焦
                  strokeColor: '#f00', //	描边的颜色，同CSS颜色
                  strokeWeight: 2, //	描边的宽度，单位为像素
                  fillColor: '#ff0', //	面填充颜色，同CSS颜色
                  fillOpacity: 0.3, //面填充的透明度，范围0-1
                  enableEditing: false, //开启可编辑模式
                },
              }}
              DrawingManager={{
                //鼠标绘制工具
                show: false,
                drawingMode: '',
                isOpen: false,
                enableCalculate: false, //	 绘制是否进行测距(画线时候)、测面积(画圆、多边形、矩形)
                enableLimit: false, //是否开启限制绘制图形距离、面积功能，该功能依赖enableCalculate值为true
                limitOptions: { area: 50000000, distance: 30000 }, //设置图形距离、面积限制的实际值，开启enableLimit后生效
                enableSorption: false, //绘制线和多边形时，是否开启鼠标吸附功能
                style: { position: 'absolute', left: 0, bottom: 120, width: 360 },
                onOverlaycomplete: (e: Event, info: any) => {
                  console.log(e, info);
                },
              }}
              DistanceTool={{
                //地图测距工具
                show: false,
                ref: (el: any) => {
                  // el.distancetool.open()
                },
                onDrawend: (e: Event, info: object) => {}, // 测距时，每次双击底图结束当前测距折线时，派发事件的接口
                onRemovepolyline: (e: Event, info: object) => {}, // 	 测距结束后，点击线段上最后一个节点旁的关闭按钮时，派发事件的接口
              }}
              CityListControl={{
                show: true,
                // anchor: 0, // 0: 左上（默认）；1：右上；2左下；3：右下
              }}
              MapTypeControl={{
                show: true,
                // anchor: 0, // 0: 左上；1：右上（默认）；2左下；3：右下
              }}
              NavigationControl={{
                show: true,
                // anchor: 0, // 0: 左上；1：右上（默认）；2左下；3：右下
              }}
              ScaleControl={{
                show: true,
                // anchor: 0, // 0: 左上；1：右上（默认）；2左下（默认）；3：右下
              }}
              ZoomControl={{
                show: true,
                // anchor: 0, // 0: 左上；1：右上；2左下；3：右下（默认）
              }}
            >
              {/* 自定义控件 */}
              {/* <CusMapServer.CityListControl /> */}
            </MapServer>
          </div>
        </Col>
        <Col span={12}>
          <Typography.Text style={{ whiteSpace: 'pre-wrap' }} type="success" code>
            实时轨迹
          </Typography.Text>
          <Row style={{ height: '50%' }}>
            <Col span={24}>
              <div style={{ position: 'relative', height: 'calc(100% - 95px)' }}>
                <MapServer
                  center={{ ...center }}
                  style={{ height: 'calc(100% - 50px)' }}
                  zoom={14}
                  // onClick={handleMapClick}
                  Marker={{
                    //添加标记点
                    show: true,
                    markers: [],
                  }}
                  Polyline={{
                    //折线
                    show: true,
                    path: [
                      new BMapGL.Point(120.303209, 31.496065),
                      new BMapGL.Point(120.305401, 31.495757),
                      ...animatedPoints,
                    ],
                    options: {
                      autoViewport: false, //是否默认聚焦
                      strokeColor: '#f00', //	描边的颜色，同CSS颜色
                      strokeWeight: 2, //	描边的宽度，单位为像素
                      fillColor: '#ff0', //	面填充颜色，同CSS颜色
                      fillOpacity: 0.3, //面填充的透明度，范围0-1
                      enableEditing: false, //开启可编辑模式
                    },
                  }}
                ></MapServer>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}, import.meta.env.VITE_WEBSOCKET_PATH);
