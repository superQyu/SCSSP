/**
 * Polygon 多边形
 */
import { useRef, useEffect, useState } from 'react';

import * as MapServer from 'react-bmapgl';
import { MapProps } from '../model';

interface Unlimit {
  [key: string]: any;
}

interface MapProps extends Unlimit {
  children?: React.ReactNode;
}

interface PolygonProps {
  show: boolean;
  path: MapProps.Position[];
  options?: Unlimit;
}

export default (props: MapProps) => {
  const { paths: p, map, onClick, loaded, onEditingEnd } = props;

  const [tilesloaded, settilesloaded] = useState<boolean>(false);
  const [paths, setPaths] = useState<Unlimit[]>([]);
  const [polygons, setPolygons] = useState<Unlimit[]>([]);

  const initPolygon = () => {
    const isArray = Object.prototype.toString.call(p) === '[object Array]';
    const newPaths = (isArray ? p : [p]).reduce((acc: any, cur: any, index: number) => {
      if (paths[index]) return [...acc, { ...paths[index], ...cur }];
      return [...acc, cur];
    }, []);

    newPaths.map(({ path, show, autoCenter, options = {} }: Unlimit, index: number) => {
      if (polygons[index]) {
        const polygon = polygons[index];
        !show ? polygon.hide() : polygon.show();
      } else {
        let opts = {
          strokeColor: 'red',
          strokeWeight: 2,
          strokeOpacity: 0.5,
          ...options,
        };
        !show && (opts.enableEditing = false);
        const polygon = new BMapGL.Polygon(path, opts);
        map.addOverlay(polygon);
        !show ? polygon.hide() : polygon.show();
        setPolygons([...polygons, polygon]);

        if (autoCenter) {
          var bounds = polygon.getBounds();
          var center = bounds.getCenter();
          map.setCenter(center);
        }

        polygon.addEventListener('lineupdate', function (event: any) {
          onEditingEnd && onEditingEnd(index, event.currentTarget.getPath());
        });
        polygon.addEventListener('click', function (event: any) {
          onClick && onClick(event);
        });
      }
    });
  };

  useEffect(() => {
    tilesloaded && initPolygon();
  }, [tilesloaded, props.paths]);

  useEffect(() => {
    loaded && loaded(polygons.map((item) => ({ isEditing: false, polygon: item })));
  }, [polygons]);

  useEffect(() => {
    map.addEventListener('tilesloaded', function () {
      settilesloaded(true);
    });
  }, []);

  return <></>;
};
