/**
 * DistanceTool 地图测距工具
 */
import { useRef, useEffect, useState } from 'react';

import * as MapServer from 'react-bmapgl';
import { MapProps } from '../model';

interface Unlimit {
  [key: string]: any;
}

interface MapProps extends Unlimit {}

export default (props: MapProps) => {
  const [show, setShow] = useState<boolean>(false);
  useEffect(() => {
    setShow(!!props.show);
  }, [props]);
  return (
    <>
      {show && (
        <MapServer.DistanceTool
          map={props.map}
          {...props}
        />
      )}
    </>
  );
};
