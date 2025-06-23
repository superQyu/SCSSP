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

  // 调整最大、最小气泡尺寸
  const MAX_BUBBLE_SIZE = 12; // 原 30，改小
  const MIN_BUBBLE_SIZE = 4; // 原 8，同步缩小

  const queryData = async () => {};

  // 带极值限制的映射函数
  const calculateBubbleSize = (
    value: number,
    minValue: number,
    maxValue: number
  ) => {
    if (minValue === maxValue) {
      return (MIN_BUBBLE_SIZE + MAX_BUBBLE_SIZE) / 2;
    }
    let baseSize =
      MIN_BUBBLE_SIZE +
      ((value - minValue) *
        (MAX_BUBBLE_SIZE - MIN_BUBBLE_SIZE)) /
        (maxValue - minValue);
    // 额外限制：再大也不超过 15（可根据需求调整）
    if (baseSize > 15) {
      baseSize = 15;
    }
    return baseSize;
  };

  const setOptions = (data: any) => {
    const allValues = data.flatMap((series) => series.data);
    const minValue = Math.min(...allValues);
    const maxValue = Math.max(...allValues);

    const option = {
      grid: {
        containLabel: true,
        right: 20,
        left: 20,
        top: '23%',
        bottom: '2%',
      },

      tooltip: {
        trigger: 'item',
      },
      legend: {
        right: 0,

        itemGap: 15,
        itemWidth: 14,
        itemHeight: 8,
        textStyle: {
          fontSize: 14,
          fontFamily: '微软雅黑',
          color: 'inherit',
        },
      },

      xAxis: {
        type: 'category',
        data: Array.from({ length: 10 }, (_, i) => `公司${i}`),
        axisTick: { show: false },
        axisLabel: { color: '#999', interval: 0, margin: 10 },
        splitLine: {
          show: true,
          lineStyle: { type: 'line', color: '#D9D9D9' },
        },
        axisLine: {
          show: true,
          lineStyle: { type: 'line', color: '#D9D9D9' },
        },
      },
      yAxis: { type: 'value', name: '（单位：人数）' },
      series: [
        {
          name: '今日无进场',
          type: 'bar',
          color: 'red', //可单独设置某个颜色，也可不设置
          data: [111, 222, 333, 82], //分别对应'3-1', '3-2', '3-3', '3-4'的值
        },
        {
          name: '昨日无进场',
          type: 'bar',
          data: [21, 32, 43, 52],
        },
        {
          name: '今日无退场',
          type: 'bar',
          data: [11, 262, 303, 22],
        },
        {
          name: '昨日无退场',
          type: 'bar',
          data: [61, 292, 313, 222],
        },
      ],
    };
    chartInstance.setOption(option);
  };

  const resizeChart = () =>
    chartInstance && chartInstance.resize();

  useEffect(() => {
    queryData();
  }, []);

  useEffect(() => {
    setChartData([
      {
        name: '无进场',
        data: chartData.map((item) => item.value),
      },
      // {
      //   name: '三天未打卡',
      //   data: chartData.map((item) => item.value),
      // },
      {
        name: '无退场',
        data: chartData.map((item) => item.value),
      },
    ]);
    if (chartRef.current) {
      chartInstance = getEChartsInstance(chartRef);
      setOptions([
        {
          name: '无进场',
          data: chartData.map((item) => item.value),
        },
        // {
        //   name: '三天未打卡',
        //   data: chartData.map((item) => item.value),
        // },
        {
          name: '无退场',
          data: chartData.map((item) => item.value),
        },
      ]);
      resizeChart();
      setSpinning(false);
    }
  }, [chartRef.current]);

  useEffect(() => {
    window.addEventListener('resize', resizeChart);
    return () => {
      chartInstance && chartInstance.dispose();
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
        />
      </div>
    </Spin>
  );
};

export default SomeChartComponent;
