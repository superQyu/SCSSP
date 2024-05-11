import React, { createContext, useContext } from 'react';
import * as echarts from 'echarts';

interface ConfigurationType {
  echarts: Record<string, any>;
  getEChartsInstance: Function;
  getLinearGradient: Function;
}

export const EChartsContext = createContext<ConfigurationType>({
  echarts: echarts,
  getEChartsInstance: () => {},
  getLinearGradient: () => {},
});

export const EChartsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const value = {
    echarts,
    getEChartsInstance: (ref: any) => {
      if (ref.current) {
        return echarts.getInstanceByDom(ref.current) || echarts.init(ref.current);
      }
      return null;
    },
    getLinearGradient: function (x1: number, y1: number, x2: number, y2: number, arr: any) {
      return new echarts.graphic.LinearGradient(x1, y1, x2, y2, arr);
    },
  } as ConfigurationType;

  return <EChartsContext.Provider value={value}>{children}</EChartsContext.Provider>;
};

export const useECharts = () => {
  const context = useContext(EChartsContext);
  return context;
};
