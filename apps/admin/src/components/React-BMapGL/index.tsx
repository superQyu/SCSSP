import { lazy, useImperativeHandle, forwardRef, Suspense, useRef, useState } from 'react';
import { Col, Spin } from 'antd';

import * as MapServer from 'react-bmapgl';

import { MapProps } from './model';

interface DrawUtilsListType {
  [key: string]: React.ComponentType<any>;
}

interface Unlimit {
  [key: string]: any;
}

interface MapProps extends Unlimit {
  children?: React.ReactNode;
}

const DrawUtilsFile = import.meta.glob('./DrawUtils/**/*.tsx');
const DrawUtilsList: DrawUtilsListType = Object.entries(DrawUtilsFile).reduce((acc, [key, val]) => {
  let label = key.split('/').slice(-1)[0].split('.')[0];
  if (label === 'index') label = key.split('/').slice(-2)[0];
  return { ...acc, [label]: lazy(val as () => Promise<any>) };
}, {});

export default forwardRef((props: MapProps, ref) => {
  const {
    center,
    style,
    zoom,
    enableScrollWheelZoom,
    AutoComplete = {},
    tools = {},
    graphicDraw,
    DrawingManager = {},
    children,
    onClick,
  } = props;
  const mapRef = useRef(null);
  const [markers, setMarkers] = useState([{ lng: 116.404, lat: 39.915 }]);
  const [mapCenter, setMapCenter] = useState<MapProps.Position>(
    center || { lng: 120.31224857818925, lat: 31.495985112865068 }
  );

  const DynamicComp = (key: string, childProps: Unlimit) => {
    const _props = typeof childProps === 'boolean' ? {} : childProps;
    if (DrawUtilsList.hasOwnProperty(key) && childProps) {
      const DrawUtilsComp = DrawUtilsList[key];
      return <DrawUtilsComp {..._props} mapRef={mapRef} />;
    }
    return <></>;
  };

  const handleMapClick = ({ latlng }: Unlimit) => {
    setMarkers([...markers, { ...latlng }]);
    onClick && onClick({ ...latlng });
  };

  useImperativeHandle(ref, () => mapRef.current);
  return (
    <>
      {/* 地址搜索 */}
      {AutoComplete.show && (
        <MapServer.AutoComplete
          onHighlight={(e) => {}}
          onConfirm={(e: any) => {
            AutoComplete.onConfirm && AutoComplete.onConfirm();
            const geocoder = new BMapGL.Geocoder();
            const business = e.item.value.business;

            // 执行反向地理编码
            geocoder.getPoint(
              e.item.value.business,
              function (locationResult: any) {
                if (locationResult) {
                  const { lng, lat } = locationResult;
                  setMapCenter({ lng, lat });
                  // mapRef.current?.centerAndZoom(locationResult, 16);
                  AutoComplete.onConfirm && AutoComplete.onConfirm({ lng, lat });
                } else {
                  // console.error('无法获取地点坐标');
                }
              },
              business
            );
          }}
          onSearchComplete={(e) => {}}
          style={{ marginBlockEnd: '15px', width: '100%' }}
        />
      )}
      <MapServer.Map
        key={center}
        style={style || {}}
        center={mapCenter}
        zoom={zoom || 13}
        enableScrollWheelZoom={enableScrollWheelZoom || true}
        onClick={handleMapClick}
        ref={mapRef}
      >
        {/* 图形绘制 */}
        {Object.entries(graphicDraw).map(([key, value], index: number) => (
          <Suspense key={`graphicDraw-${key}-${index}`}>
            {DynamicComp(key, value as Unlimit)}
          </Suspense>
        ))}

        {/* tools 工具类加载 */}
        {Object.entries(tools).map(([key, value], index: number) => (
          <Col span={24} key={`tools-${key}-${index}`}>
            <Suspense>{DynamicComp(key, value as Unlimit)}</Suspense>
          </Col>
        ))}
        {/*  DrawingManager 绘图工具*/}
        {DrawingManager.isEnabled && (
          <MapServer.DrawingManager
            map={mapRef}
            {...DrawingManager}
            onOverlaycomplete={(e: any, _: any) => {
              const { overlay } = e;
              const points =
                e.drawingMode === 'marker'
                  ? overlay.latLng
                  : overlay.points.map((item: any) => item.latLng);
              DrawingManager.onOverlaycomplete && DrawingManager.onOverlaycomplete(points, e);
            }}
          />
        )}

        {/* 自定义组件 */}
        {children}
      </MapServer.Map>
    </>
  );
});
