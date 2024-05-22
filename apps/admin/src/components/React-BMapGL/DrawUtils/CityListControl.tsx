/**
 * CityListControl 城市选择控件
 */
import * as MapServer from 'react-bmapgl';
import { MapProps } from '../model';

interface Unlimit {
  [key: string]: any;
}

interface MapProps extends Unlimit {}

export default (props: MapProps) => {
  return <MapServer.CityListControl map={props.map} {...props} />;
};
