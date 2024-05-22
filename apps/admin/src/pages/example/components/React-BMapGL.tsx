import { useRef, useEffect, useState } from 'react';
import {
  Alert,
  Col,
  Row,
  Input,
  Radio,
  Button,
  Checkbox,
  Form,
  Switch,
  Descriptions,
  Typography,
  InputNumber,
} from 'antd';
import type { FormInstance } from 'antd/es/form';
import type { RadioChangeEvent } from 'antd';

import { JsonEditor } from 'ui';

import MapServer from '@/components/React-BMapGL';
import { MapProps } from '@/components/React-BMapGL/model';

import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

import withWebSocket from '@/context/WithWebSocket';

interface Unlimit {
  [key: string]: any;
}

export default withWebSocket(({ socket }) => {
  const CHANNEL = 'car_track';

  const formRef = useRef<FormInstance>(null);
  const mapRef = useRef<any | null>(null);

  const [latlng, setLatlng] = useState<string[]>([]);

  const [tools, setTools] = useState<Unlimit>({});
  const [DistanceTool, setDistanceTool] = useState<boolean>(false);
  const [DrawingManager, setDrawingManager] = useState<boolean>(false);
  const [center, setCenter] = useState<Unlimit>({
    lng: 120.31224857818925,
    lat: 31.495985112865068,
  });

  const [zoom, setZoom] = useState<number>(17);
  const [markers, setMarkers] = useState<Unlimit[]>([]);

  const [points, setPoints] = useState<Unlimit[]>([]);

  const [value1, setValue1] = useState('');
  const [animatedPoints, setAnimatedPoints] = useState<MapProps.Position[]>([
    {
      lng: 120.31000935053041,
      lat: 31.49832801882728,
    },
    {
      lng: 120.31008916650208,
      lat: 31.497928564577148,
    },
    {
      lng: 120.3102144488597,
      lat: 31.497407614262993,
    },
    {
      lng: 120.31041939294992,
      lat: 31.496332666743424,
    },
    {
      lng: 120.31051421008465,
      lat: 31.496197869498527,
    },

    {
      lng: 120.3112838203947,
      lat: 31.496369583720526,
    },
    {
      lng: 120.31226203862387,
      lat: 31.496644378664694,
    },
    {
      lng: 120.31337690870417,
      lat: 31.497056691364943,
    },
    {
      lng: 120.31346476945085,
      lat: 31.496500103340182,
    },
    {
      lng: 120.31355263064668,
      lat: 31.49600557929561,
    },
  ]);
  const [RectShow, setRectShow] = useState<boolean>(false);
  const [polygons, setPolygons] = useState<Unlimit[]>([]);

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

  const onChange1 = ({ target: { value } }: RadioChangeEvent) => setValue1(value);

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
          <Row style={{ marginBlockEnd: '10px' }}>
            <Col span={12}>
              <Input addonBefore="纬度:" value={latlng[0]} />
            </Col>
            <Col span={12}>
              <Input addonBefore="经度:" value={latlng[1]} />
            </Col>
          </Row>
          <Form
            name="basic1"
            ref={formRef}
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 12 }}
            autoComplete="off"
            initialValues={{
              Zoom: zoom,
            }}
          >
            <Row>
              <Col span={12}>
                <Form.Item label="地图缩放" name="Zoom">
                  <InputNumber
                    onChange={(v) => setZoom(v as number)}
                    min={1}
                    max={25}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="城市选择控件" name="CityListControl">
                  <Switch
                    onChange={(v) => {
                      setTools({ ...tools, CityListControl: v });
                    }}
                    checkedChildren="开启"
                    unCheckedChildren="关闭"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="地图类型控件" name="MapTypeControl">
                  <Switch
                    onChange={(v) => {
                      setTools({ ...tools, MapTypeControl: v });
                    }}
                    checkedChildren="开启"
                    unCheckedChildren="关闭"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="3D控件" name="NavigationControl">
                  <Switch
                    onChange={(v) => {
                      setTools({ ...tools, NavigationControl: v });
                    }}
                    checkedChildren="开启"
                    unCheckedChildren="关闭"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="比例尺控件" name="ScaleControl">
                  <Switch
                    onChange={(v) => {
                      setTools({ ...tools, ScaleControl: v });
                    }}
                    checkedChildren="开启"
                    unCheckedChildren="关闭"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="缩放控件" name="ZoomControl">
                  <Switch
                    onChange={(v) => {
                      setTools({ ...tools, ZoomControl: v });
                    }}
                    checkedChildren="开启"
                    unCheckedChildren="关闭"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="地图测距工具" name="DistanceToolShow">
                  <Switch
                    onChange={(v) => setDistanceTool(v)}
                    checkedChildren="开启"
                    unCheckedChildren="关闭"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="地图绘制工具" name="DrawingManagerShow">
                  <Switch
                    onChange={(v) => setDrawingManager(v)}
                    checkedChildren="开启"
                    unCheckedChildren="关闭"
                  />
                </Form.Item>
              </Col>
            </Row>
            {DistanceTool && (
              <Form.Item name="DistanceToolRest">
                <Input addonBefore="测距结果:" addonAfter="m" style={{ width: '100%' }} />
              </Form.Item>
            )}
            <Row>
              <Col span={24}>
                <Form.Item labelCol={{ span: 5 }} label="运动轨迹" name="TrackAnimation">
                  <Radio.Group
                    onChange={onChange1}
                    optionType="button"
                    buttonStyle="solid"
                    value={value1}
                  >
                    {(value1 == '' || ['cancel'].indexOf(value1) != -1) && (
                      <Radio value={'start'}>开始</Radio>
                    )}
                    {['start', 'continue'].indexOf(value1) != -1 && (
                      <Radio value={'pause'}>暂停</Radio>
                    )}
                    {['pause'].indexOf(value1) != -1 && <Radio value={'continue'}>继续</Radio>}
                    {['start', 'pause', 'continue'].indexOf(value1) != -1 && (
                      <Radio value={'cancel'}>清除</Radio>
                    )}
                  </Radio.Group>
                </Form.Item>
                <Form.Item labelCol={{ span: 5 }} label="坐标集合" name="AnimatedPoints">
                  <JsonEditor
                    onChange={(params: any) => setAnimatedPoints(params)}
                    defaultParams={animatedPoints}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="多边形" name="RectShow">
                  <Switch
                    onChange={(v) => {
                      setRectShow(v);
                      formRef.current?.setFieldsValue({
                        RectEdit: false,
                      });
                      polygons.map(({ polygon }) => {
                        polygon.disableEditing();
                      });
                    }}
                    checkedChildren="显示"
                    unCheckedChildren="隐藏"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="启用编辑" name="RectEdit">
                  <Switch
                    onChange={(v) => {
                      polygons.map(({ isEditing, polygon }, index: number) => {
                        !isEditing ? polygon.enableEditing() : polygon.disableEditing();
                        const newItem = polygons;
                        newItem[index]['isEditing'] = !newItem[index]['isEditing'];
                        setPolygons([...newItem]);
                      });
                    }}
                    disabled={!RectShow}
                    checkedChildren="开启"
                    unCheckedChildren="关闭"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="清除" name="Reset">
                  <Switch
                    onChange={(v) => {
                      polygons.map(({ polygon }) => {
                        mapRef.current?.map.removeOverlay(polygon);
                      });
                    }}
                    checkedChildren="是"
                    unCheckedChildren="否"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col span={12}>
          <div style={{ position: 'relative', height: 'calc(100% - 95px)' }}>
            <MapServer
              ref={mapRef}
              center={{ ...center }}
              style={{ position: 'relative', height: 'calc(100% - 75px)' }}
              zoom={zoom}
              onClick={handleMapClick}
              AutoComplete={{
                show: true,
              }}
              // 辅助工具
              tools={{
                ...tools,
                DistanceTool: {
                  show: !!DistanceTool,
                  onAddpoint: (e: any) => {
                    formRef.current?.setFieldsValue({
                      DistanceToolRest: e.distance,
                    });
                  },
                  onDrawend: (e: any) => {
                    formRef.current?.setFieldsValue({
                      DistanceToolRest: e.distance,
                    });
                  },
                  onRemovepolyline: () => {
                    setDistanceTool(false);
                    formRef.current?.setFieldsValue({
                      DistanceToolShow: false,
                      DistanceToolRest: '',
                    });
                  },
                },
              }}
              // 画图工具
              DrawingManager={{
                isEnabled: !!DrawingManager,
                style: { position: 'absolute', left: 0, top: 0, width: 360 },
                enableLimit: false,
                limitOptions: { area: 5000, distance: 30 },
                enableCalculate: true,
                onOverlaycomplete: (e: Event, info: any) => {},
              }}
              graphicDraw={{
                Marker: {
                  show: true,
                  position: [...markers],
                  onClick: (e: any) => {},
                  onMouseover: (e: any) => {},
                  onMouseout: (e: any) => {},
                },
                Polygon: {
                  show: true,
                  loaded: (polys: any) => {
                    setPolygons(polys);
                  },
                  // onClick: (e: any) => console.log(e),
                  onEditingEnd: (index: number, path: MapProps.Position[]) => {
                    // console.log(index, path);
                  },
                  // onMouseover: (e: any) => {console.log(e)},
                  // onMouseout: (e: any) => {console.log(e)},
                  paths: [
                    {
                      show: !!RectShow,
                      path: [
                        new BMapGL.Point(120.31038459425596, 31.498278877759205),
                        new BMapGL.Point(120.31066306896406, 31.497054982508555),
                        // new BMapGL.Point(120.31103586575071, 31.496131277267946),
                        // new BMapGL.Point(120.31276061232987, 31.496377599566404),
                        new BMapGL.Point(120.31211832389023, 31.496893334756617),
                        new BMapGL.Point(120.31206442555963, 31.49844822048211),
                      ],
                      options: {
                        fillColor: 'red',
                        fillOpacity: 0.25,
                        // strokeColor: 'yellow',
                        // enableMassClear: false,
                      },
                    },
                    // {
                    //   show: true,
                    //   path: [
                    //     new BMapGL.Point(120.31371730769798, 31.495346120568676),
                    //     new BMapGL.Point(120.31263934108601, 31.495515468655135),
                    //     new BMapGL.Point(120.31281900218801, 31.496223648206655),
                    //     new BMapGL.Point(120.31350171437559, 31.49648536536593),
                    //   ],
                    // },
                  ],
                },
                TrackAnimation: {
                  tracks: {
                    loaded: (polys: any) => {
                      // var lineBounds = polys.getBounds();
                      // var polygonBounds = polygons[0].polygon.getBounds();
                      // console.log(lineBounds.intersects(polygonBounds));
                      var result = BMapGLLib.GeoUtils.isPolylineIntersectArea(
                        polys,
                        polygons[0].polygon
                      );

                      console.log('result', result);
                    },
                    actions: value1,
                    position: [...animatedPoints],
                    options: {},
                  },
                },
              }}
            ></MapServer>
          </div>
        </Col>
      </Row>
    </>
  );
}, import.meta.env.VITE_WEBSOCKET_PATH);
