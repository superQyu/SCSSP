import { useEffect, useRef } from 'react';
import { useECharts } from '@/context/EChartContext';

interface Props {
  /** { total: 100, value: 30 } */
  data?: any;
}

const SomeChartComponent = (props: Props) => {
  const { data: chartData = { total: 100, value: 30 } } = props;

  const { getEChartsInstance, getLinearGradient } = useECharts();
  const chartRef = useRef(null);

  let chartInstance: any = null;

  // useEffect(() => {
  //   setOptions();
  // }, []);
  useEffect(() => {
    initChart();
    setOptions();
    return () => {
      chartInstance.dispose();
      window.removeEventListener('resize', () =>
        chartInstance.resize()
      );
    };
  }, [chartData]);
  // useEffect(() => {
  //   initChart()
  //   setOptions();
  // }, [chartData]);

  const initChart = () => {
    if (!chartInstance) {
      chartInstance = getEChartsInstance(chartRef);
    }
    window.addEventListener('resize', () =>
      chartInstance.resize()
    );
  };

  const setOptions = () => {
    const max = chartData.total;
    const value = chartData.value;
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

  return <div ref={chartRef} className="w-full h-full"></div>;
};

export default SomeChartComponent;
