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

  const handleCancel = () => {
    setOpen(false);
  };

  const initData = () => {
    console.log('subForm', subForm);
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
