/**
 * Marker 点标注
 */
import { useEffect, useState } from 'react';

import * as MapServer from 'react-bmapgl';
import { MapProps } from '../model';

interface Unlimit {
  [key: string]: any;
}

interface MapProps extends Unlimit {
  children?: React.ReactNode;
}

export default (props: MapProps) => {
  const { position } = props;
  const [markers, setMarkers] = useState<MapProps.Pointer[]>([]);

  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    setShow(!!props.show);
    const isArray = Object.prototype.toString.call(position) === '[object Array]';
    setMarkers([...(isArray ? position : [position])]);
  }, [props]);

  return (
    <>
      {show &&
        markers.map((item: any, index: number) => (
          <MapServer.Marker
            map={props.map}
            key={index}
            onClick={(e) => props?.onClick && props?.onClick(e)}
            onMouseover={(e) => props?.onMouseover && props?.onMouseover(e)}
            onMouseout={(e) => props?.onMouseout && props?.onMouseout(e)}
            {...item}
          />
        ))}
    </>
  );
};
