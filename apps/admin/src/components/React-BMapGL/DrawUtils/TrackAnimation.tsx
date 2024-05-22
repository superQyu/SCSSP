/**
 * TrackAnimation 视角轨迹动画
 */
import { useEffect, useRef, useState } from 'react';
import { MapProps } from '../model';

interface Unlimit {
  [key: string]: any;
}

interface MapProps extends Unlimit {
  children?: React.ReactNode;
}

interface TrackAni extends Unlimit {
  key?: string;
  actions: 'start' | 'cancel' | 'pause' | 'continue';
  position: MapProps.Position[];
}

export default (props: MapProps) => {
  const { tracks } = props;

  const trackRef = useRef<Unlimit>({});
  const [tilesloaded, settilesloaded] = useState<boolean>(false);

  const initTrackAni = (tracksItems: TrackAni[]) => {
    // console.log(tracksItems);
    tracksItems.map(({ position, actions, key, loaded }: TrackAni, index: number) => {
      const k = key || `${index}`;
      if (actions === 'start') {
        if (tilesloaded) {
          const path = position.reduce((acc: MapProps.Pointer[], cur) => {
            return [...acc, new BMapGL.Point(cur.lng, cur.lat)];
          }, []);
          const polyline = new BMapGL.Polyline(path);
          const icon = new BMapGL.Icon(
            'http://api.map.baidu.com/img/car.png',
            new BMapGL.Size(52, 26)
          );
          trackRef.current[k] = new BMapGLLib.TrackAnimation(props.map, polyline, {
            overallView: true,
            tilt: 30,
            duration: 20000,
            delay: 300,
            icon,
            // strokeColor: 'red',
          });
          trackRef.current[key || `${index}`].start();
          // console.log(trackRef.current[k].markerOptions)
          // trackRef.current[k].markerOptions.icon =icon;
          loaded && loaded(polyline);
        }
      } else {
        const trackAni = trackRef.current[k];
        if (trackAni && trackAni[actions]) trackAni[actions]();
      }
    });
  };

  useEffect(() => {
    props.map.addEventListener('tilesloaded', function () {
      settilesloaded(true);
    });
  }, []);
  useEffect(() => {
    initTrackAni(Array.isArray(tracks) ? tracks : [tracks]);

    return () => {
      Object.entries(trackRef.current).map((track: any) => {
        track.cancel && track.cancel();
        track._clearRAF && track._clearRAF();
      });
    };
  }, [tilesloaded, tracks]);

  return <></>;
};
