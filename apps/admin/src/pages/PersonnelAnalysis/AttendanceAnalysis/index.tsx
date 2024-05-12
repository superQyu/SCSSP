import { useEffect, useRef } from 'react';

import { useECharts } from '@/context/EChartContext';

const SomeChartComponent = () => {
  const { getEChartsInstance, getLinearGradient } = useECharts();
  const chartRef = useRef(null);
  const xAxis = ['木工', '建筑电工', '起重信号工', '钢筋工', '混凝土工', '除尘工'];
  const data = [30, 26, 13, 13, 12, 15, 20, 30, 12, 15, 20, 30];

  let chartInstance: any = null;

  const setOptions = () => {
    const option = {
      color: ['#1A64F8'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'none',
        },
        formatter: function (prams) {
          return prams[0].name + ':' + prams[0].data;
        },
      },

      grid: {
        left: '8%',
        right: '8%',
        top: '10%',
        bottom: '10%',
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
            align: 'center',
          },
        },
      ],
      yAxis: {
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
          name: '考勤分析',
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
  };

  const resizeChart = () => chartInstance.resize();

  useEffect(() => {
    chartInstance = getEChartsInstance(chartRef);
    setOptions();
  }, []);

  useEffect(() => {
    window.addEventListener('resize', resizeChart);
    return () => {
      chartInstance.dispose();
      window.removeEventListener('resize', resizeChart);
    };
  }, []);

  return <div ref={chartRef} className="w-full h-full"></div>;
};

export default SomeChartComponent;
