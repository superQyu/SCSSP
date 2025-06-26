import { useEffect, useRef, useState } from 'react';
import { Spin } from 'antd';
import dayjs from 'dayjs';

import { useECharts } from '@/context/EChartContext';
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
import { useAppSelector } from 'hooks';
const SomeChartComponent = () => {
  const { site } = useAppSelector((state) => state);
  const { websocket } = site;
  const { server } = useBasicConfiguration();
  const { materialEnter } = server;
  const { getEChartsInstance, getLinearGradient } = useECharts();
  const chartRef = useRef(null);
  const [spinning, setSpinning] = useState(true);
  const [chartData, setChartData] = useState<number[]>([]);
  const [xAxis, setXAxis] = useState<string[]>([]);

  let chartInstance: any = null;

  const queryData = async () => {
    const { acceptMaterials, enterMaterials } =
      await materialEnter.AnalyseByTime();
    const acceptObj = Object.fromEntries(
      acceptMaterials.map((item) => [item.enterDate, item.count])
    );
    const enterObj = Object.fromEntries(
      enterMaterials.map((item) => [item.enterDate, item.count])
    );
    let list = [
      ...new Set([
        ...acceptMaterials.map((item: any) => item.enterDate),
        ...enterMaterials.map((item: any) => item.enterDate),
      ]),
    ].sort();
    const acceptData = list.map((el) => acceptObj[el]);
    const enterData = list.map((el) => enterObj[el]);
    list = list.map((el) => dayjs(el).format('MM.DD'));
    setXAxis(list);
    setChartData([acceptData, enterData]);
  };

  const setOptions = () => {
    setSpinning(true);

    const option = {
      grid: {
        containLabel: true,
        right: '2%',
        left: '2%',
        top: '15%',
        bottom: '2%',
      },

      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
        },
        formatter: function (params) {
          let res = `${params[0].axisValue}<br/>`;
          params.forEach((item) => {
            res += `${item.seriesName}: ${item.value}<br/>`;
          });
          return res;
        },
      },

      legend: {
        data: ['实到数', '已验收'],
        top: 0,
        right: '10px',
        icon: 'circle',
        itemWidth: 6,
        itemHeight: 6,
      },

      xAxis: {
        type: 'category',
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: '#999',
          interval: 0,
          margin: 10,
          // rotate: -25,
        },
        axisLine: {
          show: true,
          lineStyle: {
            type: 'line',
            color: '#AAAAAA',
          },
        },
        data: xAxis,
      },
      yAxis: {
        type: 'value',
        name: '数量',
        nameGap: 20,
        nameTextStyle: {
          color: '#999',
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: '#999',
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'line',
          },
        },
      },
      // 系列数据配置，这里模拟了两条折线（带面积填充）
      series: [
        {
          name: '实到数',
          type: 'line',
          smooth: true,
          symbolSize: 0,
          areaStyle: {
            color: getLinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(135, 206, 250, 0.8)',
              },
              {
                offset: 1,
                color: 'rgba(135, 206, 250, 0.2)',
              },
            ]),
          },
          lineStyle: {
            color: '#4e80f4',
          },
          data: chartData[0],
        },
        {
          name: '已验收',
          type: 'line',
          smooth: true,
          symbolSize: 0,
          areaStyle: {
            color: getLinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(218, 112, 214, 0.8)',
              },
              {
                offset: 1,
                color: 'rgba(218, 112, 214, 0.2)',
              },
            ]),
          },
          lineStyle: {
            color: '#aa68fb',
          },
          data: chartData[1],
        },
      ],
    };
    chartInstance.setOption(option);
    setSpinning(false);
  };

  const resizeChart = () => chartInstance.resize();

  useEffect(() => {
    queryData();
  }, []);

  useEffect(() => {
    queryData();
  }, [websocket.material]);

  useEffect(() => {
    chartInstance = getEChartsInstance(chartRef);
    setOptions();
    resizeChart();
    setSpinning(false);
  }, [chartData]);

  useEffect(() => {
    window.addEventListener('resize', resizeChart);
    return () => {
      chartInstance.dispose();
      window.removeEventListener('resize', resizeChart);
    };
  }, []);

  return (
    <Spin
      wrapperClassName="cus-spin"
      tip="加载中"
      spinning={spinning}
    >
      <div className="flex justify-center items-center h-full">
        {!chartData.length && (
          <div className="color-#409eff">暂无数据</div>
        )}
        <div
          className={`w-full h-full ${
            !chartData.length && 'hidden'
          }`}
          ref={chartRef}
        ></div>
      </div>
    </Spin>
  );
};

export default SomeChartComponent;
