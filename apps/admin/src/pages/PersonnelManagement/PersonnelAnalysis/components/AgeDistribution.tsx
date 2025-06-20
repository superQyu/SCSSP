import { useEffect, useRef, useState } from 'react';
import { Spin } from 'antd';

import { useECharts } from '@/context/EChartContext';
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

const SomeChartComponent = () => {
  const { server } = useBasicConfiguration();
  const { attendance } = server;
  const { getEChartsInstance } = useECharts();

  const chartRef = useRef(null);
  const [spinning, setSpinning] = useState(true);
  const [chartData, setChartData] = useState<any[]>([]);

  let chartInstance: any = null;

  const queryData = async () => {
    const res =
      await attendance.getSafetyManagerAttendanceCount();
    setChartData([
      {
        name: '40岁以下',
        value: 10,
      },
      {
        name: '40~50岁',
        value: 20,
      },
      {
        name: '50~60岁',
        value: 5,
      },
      {
        name: '60岁以上',
        value: 30,
      },
    ]);
    setOptions([
      {
        name: '40岁以下',
        value: 10,
      },
      {
        name: '40~50岁',
        value: 20,
      },
      {
        name: '50~60岁',
        value: 15,
      },
      {
        name: '60岁以上',
        value: 30,
      },
    ]);
  };

  const setOptions = (data: any) => {
    const option = {
      color: ['#99d3ff', '#66bcff', '#f7ac63', '#ea6a8b'],
      grid: {
        left: '1%',
        right: '1%',
        top: 0,
        bottom: '20%',
      },
      xAxis: {
        show: false,
      },
      yAxis: {
        show: false,
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c}',
      },
      series: [
        {
          type: 'treemap',
          breadcrumb: {
            show: false,
          },
          roam: false,
          data: data,
        },
      ],
    };
    chartInstance.setOption(option);
  };

  const resizeChart = () => chartInstance.resize();

  useEffect(() => {
    queryData();
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      chartInstance = getEChartsInstance(chartRef);
      // setOptions();
      resizeChart();
      setSpinning(false);
    }
  }, [chartData, chartRef.current]);

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
