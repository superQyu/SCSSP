import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Modal } from 'antd';

import { MapProps } from '@/components/React-BMapGL/model';
import MapServer from '@/components/React-BMapGL';

type MenusType = {
  [key: string]: any;
};

interface Props {
  /** 表单初始化 */
  subForm: {};
  /** 监听Modal状态变化 */
  onStateChange?: (state: boolean) => void;
}

const DetailForm: React.FC<Props> = forwardRef(({ subForm }: Props, ref) => {
  const [title] = useState<string>('查看车辆轨迹');
  const [open, setOpen] = useState<boolean>(false);
  const [animatedPoints, setAnimatedPoints] = useState<MapProps.Position[]>([]);

  const handleCancel = () => {
    setOpen(false);
  };

  const initData = () => {
    if (!subForm.length) return;
    const points = subForm.map((item: any) => {
      // const point = item.point.split(',');
      return {
        // lng: point[0] * 1,
        // lat: point[1] * 1,
        lng: item.mlng * 1,
        lat: item.mlat * 1,
      };
    });
    setAnimatedPoints(points);
  };

  useEffect(() => {
    initData();
  }, [subForm]);

  useImperativeHandle(ref, () => ({
    openModal: (openModal: boolean) => setOpen(openModal),
  }));

  return (
    <Modal
      width={'900px'}
      open={open}
      title={title}
      maskClosable={false}
      onCancel={handleCancel}
      footer={[]}
      destroyOnClose={true}
    >
      <div className="w-full h-500px">
        <MapServer
          style={{ height: '100%' }}
          graphicDraw={{
            Polygon: {
              show: true,
              loaded: (polys: any) => {
                // setPolygons(polys);
              },
              onEditingEnd: (index: number, path: MapProps.Position[]) => {},
              paths: [
                {
                  show: true,
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
              ],
            },
            TrackAnimation: {
              tracks: {
                loaded: (polys: any) => {
                  // var lineBounds = polys.getBounds();
                  // var polygonBounds = polygons[0].polygon.getBounds();
                  // console.log(lineBounds.intersects(polygonBounds));
                  // var result = BMapGLLib.GeoUtils.isPolylineIntersectArea(
                  //   polys,
                  //   polygons[0].polygon
                  // );
                },
                actions: 'start',
                position: [...animatedPoints],
                options: {},
              },
            },
          }}
        />
      </div>
    </Modal>
  );
});
export default DetailForm;
