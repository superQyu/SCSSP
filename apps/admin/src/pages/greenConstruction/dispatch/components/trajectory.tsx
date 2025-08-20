import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
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

const DetailForm: React.FC<Props> = forwardRef(
  ({ subForm }: Props, ref) => {
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
      // if (!subForm?.points?.length) return;
      // const points = subForm.points.split(';').map((item: string) => {
      //   return new BMapGL.Point(Number(item.split(',')[0]), Number(item.split(',')[1]));
      // });
      // setPolygons(points);
    };

    // useEffect(() => {
    //   // initData();
    // }, [subForm]);

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
            // 画图工具
            DrawingManager={{
              isEnabled: false,
              style: { position: 'absolute', left: 0, top: 0, width: 360 },
              enableLimit: false,
              limitOptions: { area: 5000, distance: 30 },
              enableCalculate: true,
              onOverlaycomplete: (e: Event) => {
                const points = e
                  .map(({ lng, lat }: { lng: string; lat: string }) => `${lng},${lat}`)
                  .join(';');
                formRef.current?.setFieldValue('points', points);
                // 获取合理的中心点
                // const centerPoint = map.getViewport(points)

              },
            }}
            graphicDraw={{}}
          ></MapServer>
        </div>
      </Modal>
    );
  }
);
export default DetailForm;
