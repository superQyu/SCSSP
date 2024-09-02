import { useEffect, useRef } from 'react';
import { useECharts } from '@/context/EChartContext';
import { Spin } from 'antd';
import { useState } from 'react';

interface Props {
  data?: any[];
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
  } = props;

  const { getEChartsInstance, getLinearGradient } = useECharts();

  const config: Config = {};
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
  }, [chartData]);

  const setConfig = () => {};

  const setOptions = () => {
    setSpinning(true);
    const xAxis = chartData.map((item: any) => item.name);
    const data = chartData.map((item: any) => item.value);
    const option = {
      color: ['#1A64F8'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'none',
        },
        formatter: function (params: any) {
          return params[0].name + ':' + params[0].data;
        },
      },
      grid: {
        left: '8%',
        right: '8%',
        top: '13%',
        bottom: '15%',
      },
      xAxis: [
        {
          type: 'category',
          data: xAxis,
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: '#606266',
            interval: 0,
            margin: 10,
            rotate: -25
          },
        },
      ],
      yAxis: {
        name: '(单位:人)',
        nameGap: 20,
        nameTextStyle: {
          color: '#454545',
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: '#454545',
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'line',
          },
        },
      },
      series: [
        {
          name: '班组人数',
          type: 'bar',
          backgroundStyle: {
            color: 'rgba(216, 229, 247, 0.55)',
            borderRadius: [8, 8, 0, 0],
          },
          itemStyle: {
            normal: {
              borderRadius: [12, 12, 0, 0],
              color: getLinearGradient(0, 0, 0, 1, [
                {
                  offset: 1,
                  color: 'rgba(125, 188, 255, 0)',
                },
                {
                  offset: 0,
                  color: 'rgba(73, 161, 255, 1)',
                },
              ]),
            },
          },
          barWidth: '25',
          label: {
            show: true,
            color: '#454545',
            position: 'outside',
          },
          data: data,
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
