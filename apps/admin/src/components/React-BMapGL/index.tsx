import { useRef, useState } from 'react';

import * as MapServer from 'react-bmapgl';

interface Unlimit {
  [key: string]: any;
}

interface MapProps extends Unlimit {
  children?: React.ReactNode;
}

const defParams = {
  map: null,
};
export const AutoComplete = (prop: Unlimit) => {
  return <MapServer.AutoComplete {...prop} />;
};
export default ({
  center,
  style,
  Marker,
  zoom,
  Polygon = {},
  Polyline = {},
  CityListControl = {},
  MapTypeControl = {},
  NavigationControl = {},
  ScaleControl = {},
  ZoomControl = {},
  DrawingManager = {},
  DistanceTool = {},
  children,
  onClick,
}: MapProps) => {
  const mapRef = useRef(null);
  const [markers, setMarkers] = useState([{ lng: 116.404, lat: 39.915 }]);

  const handleMapClick = ({ latlng }: Unlimit) => {
    setMarkers([...markers, { ...latlng }]);
    onClick && onClick({ ...latlng });
  };

  return (
    <>
      <MapServer.Map
        style={style || {}}
        center={center || { lng: 120.31224857818925, lat: 31.495985112865068 }}
        zoom={zoom || 13}
        enableScrollWheelZoom
        onClick={handleMapClick}
        ref={mapRef}
      >
        {/* 添加标记点 */}
        {Marker && Marker.show && (
          <>
            {Marker.markers.map((item: any, index: number) => (
              <MapServer.Marker
                {...defParams}
                {...item}
                key={index}
                enableMassClear
                onClick={(e) => Marker?.onClick && Marker?.onClick(e)}
                onMouseover={(e) => Marker?.onMouseover && Marker?.onMouseover(e)}
                onMouseout={(e) => Marker?.onMouseout && Marker?.onMouseout(e)}
              />
            ))}
          </>
        )}
        {/* Polygon 多边形 */}
        {Polygon && Polygon.show && Polygon.path && (
          <MapServer.Polygon
            {...defParams}
            {...Polygon.options}
            enableMassClear
            path={[...Polygon.path]}
            onClick={(e) => Polygon?.onClick && Polygon?.onClick(e)}
            onMouseover={(e) => Polygon?.onMouseover && Polygon?.onMouseover(e)}
            onMouseout={(e) => Polygon?.onMouseout && Polygon?.onMouseout(e)}
          />
        )}
        {/* Polyline 折线 */}
        {Polyline && Polyline.show && Polyline.path && (
          <MapServer.Polyline
            {...defParams}
            {...Polyline.options}
            enableMassClear
            path={[...Polyline.path]}
            onClick={(e) => Polyline?.onClick && Polygon?.onClick(e)}
            onMouseover={(e) => Polyline?.onMouseover && Polygon?.onMouseover(e)}
            onMouseout={(e) => Polyline?.onMouseout && Polygon?.onMouseout(e)}
          />
        )}

        {/* 地图县官操作 */}
        {/* Circle 圆形 */}
        {/* <MapServer.Circle
            center={new BMapGL.Point(116.4, 39.91)}
            radius={5000}
            strokeColor="#f00"
            strokeWeight={2}
            fillColor="#ff0"
            fillOpacity={0.3}
          /> */}
        {/* CustomOverlay 自定义覆盖物 */}
        {/* <MapServer.CustomOverlay position={new BMapGL.Point(116.35, 39.88)}>
            <div
              className="custom"
              style={{ width: 40, height: 40, background: 'rgba(222, 0, 0, 0.8)' }}
            >
              <span style={{ color: '#fff' }}>DOM</span>
            </div>
          </MapServer.CustomOverlay> */}
        {/* InfoWindow 信息窗口 */}
        {/* <MapServer.InfoWindow
          position={new BMapGL.Point(116.4, 39.91)}
          title="标题"
          text="快速文本信息窗口"
          onClickclose={(e) => {
            console.log(e);
          }}
        /> */}
        {/* Polyline 折线 */}
        {/* <MapServer.Polyline
            path={[
              new BMapGL.Point(116.35, 39.88),
              new BMapGL.Point(116.4, 39.92),
              new BMapGL.Point(116.33, 40.01),
            ]}
            strokeColor="#f00"
            strokeWeight={10}
          /> */}

        {/* CityListControl 城市选择控件 */}
        {(!CityListControl || CityListControl.show) && (
          <MapServer.CityListControl {...defParams} {...CityListControl} />
        )}

        {/* MapTypeControl 地图类型控件 */}
        {(!MapTypeControl || MapTypeControl.show) && (
          <MapServer.MapTypeControl {...defParams} {...MapTypeControl} />
        )}

        {/* NavigationControl 3D控件 */}
        {(!NavigationControl || NavigationControl.show) && (
          <MapServer.NavigationControl {...defParams} {...NavigationControl} />
        )}

        {/* ScaleControl 比例尺控件 */}
        {(!ScaleControl || ScaleControl.show) && (
          <MapServer.ScaleControl {...defParams} {...ScaleControl} />
        )}

        {/* ZoomControl 缩放控件 */}
        {(!ZoomControl || ZoomControl.show) && (
          <MapServer.ZoomControl {...defParams} {...ZoomControl} />
        )}

        {/* DrawingManager 鼠标绘制工具*/}
        {DrawingManager.show && <MapServer.DrawingManager {...DrawingManager} />}

        {/* DistanceTool 地图测距工具 */}
        {DistanceTool.show && <MapServer.DistanceTool {...DistanceTool} />}

        {children}
      </MapServer.Map>
    </>
  );
};
