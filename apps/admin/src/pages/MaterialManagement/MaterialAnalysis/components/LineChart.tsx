import { useEffect, useRef } from 'react';
import { useECharts } from '@/context/EChartContext';
import { Spin } from 'antd';
import { useState } from 'react';

interface Props {
  data?: any[];
  unit: string;
}
interface Config {}

export default (props: Props) => {
  const {
    data: chartData = [
      { name: '木工', value: 72 },
      { name: '建筑电工', value: 71 },
      { name: '起重信号工', value: 47 },
      { name: '钢筋工', value: 34 },
      { name: '混凝土工', value: 68 },
      { name: '除尘工', value: 68 },
    ],
    unit,
  } = props;

  const { getEChartsInstance, getLinearGradient } = useECharts();

  const chartRef = useRef(null);

  const [spinning, setSpinning] = useState(true);

  let chartInstance: any = null;

  useEffect(() => {
    if (!chartInstance) {
      chartInstance = getEChartsInstance(chartRef);
    }
    window.addEventListener('resize', () =>
      chartInstance.resize()
    );
    return () => {
      chartInstance.dispose();
      window.removeEventListener('resize', () =>
        chartInstance.resize()
      );
    };
  }, []);
  useEffect(() => {
    if (!chartInstance) {
      chartInstance = getEChartsInstance(chartRef);
    }
    setConfig();
    setOptions();
    chartInstance.resize();
  }, [chartData, unit]);

  const setConfig = () => {};

  const setOptions = () => {
    setSpinning(true);
    const xAxis = chartData.map((item: any) => item.name);
    const data = chartData.map((item: any) => item.value);
    const option = {
      grid: {
        containLabel: true,
        right: '2%',
        left: '2%',
        top: '15%',
        bottom: '2%',
      },
      //  tooltip 提示框配置，实现悬浮显示数据
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
      // 图例配置，标识不同系列数据
      legend: {
        data: ['实到数', '已验收'],
        top: 0, // 图例位置，可按需调整
        right: '10px',
        icon: 'circle',
        itemWidth: 6,
        itemHeight: 6,
      },
      // 直角坐标系配置
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
        data: [
          '6.1',
          '6.2',
          '6.3',
          '6.4',
          '6.5',
          '6.6',
          '6.7',
          '6.8',
          '6.9',
          '6.10',
          '6.11',
        ],
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
          data: [30, 40, 50, 30, 40, 50, 60, 55, 35, 50, 90],
        },
        {
          name: '已验收',
          type: 'line',
          smooth: true,
          symbolSize: 0 ,
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
          data: [15, 20, 18, 15, 12, 20, 22, 35, 10, 30, 70],
        },
      ],
    };
    chartInstance.setOption(option);
    setSpinning(false);
  };

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
