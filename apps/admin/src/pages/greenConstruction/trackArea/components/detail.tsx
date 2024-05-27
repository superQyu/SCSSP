import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from 'react';
import { Modal } from 'antd';

import { MapProps } from '@/components/React-BMapGL/model';
import MapServer from '@/components/React-BMapGL';

interface Unlimit {
  [key: string]: any;
}
interface Props {
  /** 表单初始化 */
  subForm: {};
  /** 监听Modal状态变化 */
  onStateChange?: (state: boolean) => void;
}

const DetailForm: React.FC<Props> = forwardRef(({ subForm }: Props, ref) => {
  const [title] = useState<string>('查看车辆轨迹');
  const [open, setOpen] = useState<boolean>(false);
  const mapRef = useRef();
  const [center, setCenter] = useState<Unlimit>({});
  const [zoom, _] = useState<number>(17);
  const [polygons, setPolygons] = useState<Unlimit[]>([]);

  const handleCancel = () => {
    setOpen(false);
  };

  const initData = () => {
    if (!subForm?.points?.length) return;
    const points = subForm.points.split(';').map((item: string) => {
      return new BMapGL.Point(Number(item.split(',')[0]), Number(item.split(',')[1]));
    });
    const center = { lng: 0, lat: 0 };
    points.forEach((point) => {
      center.lng += point.lng;
      center.lat += point.lat;
    });
    center.lng /= points.length;
    center.lat /= points.length;
    setCenter(center);
    setPolygons(points);
  };

  useEffect(() => {
    initData();
  }, [subForm]);

  useImperativeHandle(ref, () => ({
    openModal: (openModal: boolean) => setOpen(openModal),
  }));

  return (
    <Modal
      width={'1000px'}
      open={open}
      title={title}
      maskClosable={false}
      onCancel={handleCancel}
      footer={[]}
      destroyOnClose={true}
    >
      <div className="w-full h-500px">
        <MapServer
          ref={mapRef}
          center={{ ...center }}
          style={{ position: 'relative', height: 'calc(100%)' }}
          zoom={zoom}
          graphicDraw={{
            Polygon: {
              show: true,
              loaded: (polys: any) => {
                if (polys[0]) {
                  // var centerPoint = polys[0]?.polygon.getBounds().getCenter();
                  // setCenter(centerPoint);
                }
              },
              onEditingEnd: (index: number, path: MapProps.Position[]) => {
                // console.log(index, path);
              },
              paths: [
                {
                  show: true,
                  path: polygons,
                  autoCenter: true,
                  options: {
                    fillColor: 'red',
                    fillOpacity: 0.25,
                  },
                },
              ],
            },
          }}
        />
      </div>
    </Modal>
  );
});
export default DetailForm;
