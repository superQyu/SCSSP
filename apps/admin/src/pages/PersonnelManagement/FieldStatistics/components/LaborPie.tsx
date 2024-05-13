import { useEffect, useRef } from 'react';
import { useECharts } from '@/context/EChartContext';

const SomeChartComponent = () => {
  const { getEChartsInstance, getLinearGradient } = useECharts();
  const chartRef = useRef(null);
  var chartData = {
    value: 30,
    total: 100,
  };

  let max = chartData.total;
  let value = chartData.value;
  let chartInstance: any = null;

  const setOptions = () => {
    const option = {
      angleAxis: {
        axisLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        min: 0,
        max: 100,
        startAngle: 90,
      },
      radiusAxis: {
        type: 'category',
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: true,
        },
        data: [],
      },
      polar: {
        radius: '130%',
        center: ['50%', '50%'],
      },
      series: [
        {
          type: 'bar',
          data: [value],
          z: 1,
          coordinateSystem: 'polar',
          barMaxWidth: 30,
          name: '劳务信息',
          roundCap: 1,
          color: getLinearGradient(0, 1, 0, 0, [
            {
              offset: 0,
              color: '#0185f5',
            },
            {
              offset: 0.5,
              color: '#058fe0',
            },
            {
              offset: 1,
              color: '#099dc2',
            },
          ]),
          label: {
            show: true,
            position: 'right',
          },
        },
        // 背景图形
        {
          type: 'bar',
          data: [max],
          z: 0,
          silent: true,
          coordinateSystem: 'polar',
          barMaxWidth: 30,
          roundCap: true,
          color: '#26ff00',
          barGap: '-100%',
          label: {
            show: true,
            position: 'left',
          },
   
        },
        // 尾端小圆点 饼图
        {
          type: 'pie',
          radius: '127%',
          center: ['50%', '50%'],
          hoverAnimation: false,
          startAngle: 180,
          endAngle: 0,
          silent: 1,
          z: 6,
          data: [
            {
              value: 0.51,
              itemStyle: {
                color: 'transparent',
              },
            },
            {
              value: 0,
              label: {
                position: 'inside',
                backgroundColor: '#ffffff',
                borderRadius: 12,
                padding: 12,
              },
            },
            {
              value: 0.49,
              itemStyle: {
                color: 'transparent',
              },
            },
          ],
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
