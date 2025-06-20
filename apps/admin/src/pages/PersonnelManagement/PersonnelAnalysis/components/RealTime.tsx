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
  const MIN_BUBBLE_SIZE = 4;  // 原 8，同步缩小

  const queryData = async () => {
    const res = await attendance.getSafetyManagerAttendanceCount();
    setChartData([
      { name: '40岁以下', value: 10 },
      { name: '40~50岁', value: 20 },
      { name: '50~60岁', value: 15 },
      { name: '60岁以上', value: 30 },
    ]);
  };

  // 带极值限制的映射函数
  const calculateBubbleSize = (value: number, minValue: number, maxValue: number) => {
    if (minValue === maxValue) {
      return (MIN_BUBBLE_SIZE + MAX_BUBBLE_SIZE) / 2;
    }
    let baseSize = MIN_BUBBLE_SIZE + (value - minValue) * (MAX_BUBBLE_SIZE - MIN_BUBBLE_SIZE) / (maxValue - minValue);
    // 额外限制：再大也不超过 15（可根据需求调整）
    if (baseSize > 15) {
      baseSize = 15;
    }
    return baseSize;
  };

  const setOptions = (data: any) => {
    const allValues = data.flatMap(series => series.data);
    const minValue = Math.min(...allValues);
    const maxValue = Math.max(...allValues);

    const option = {
      grid: { containLabel: true, right: 20, left: 20, top: '23%', bottom: '2%' },
      legend: { right: 0 },
      tooltip: {
        trigger: 'item',
        formatter: (params: any) => `${params.name}<br/>${params.seriesName}人数：${params.value}人`
      },
      xAxis: {
        type: 'category',
        data: Array.from({ length: 10 }, (_, i) => `工种${i}`),
        axisTick: { show: false },
        axisLabel: { color: '#999', interval: 0, margin: 10 },
        splitLine: { show: true, lineStyle: { type: 'line', color: '#D9D9D9' } },
        axisLine: { show: true, lineStyle: { type: 'line', color: '#D9D9D9' } },
      },
      yAxis: { type: 'value', name: '（单位：人数）' },
      series: [
        {
          name: '各工种',
          type: 'scatter',
          data: Array.from({ length: 10 }, () => Math.floor(Math.random() * 100)),
          symbolSize: (val: any) => calculateBubbleSize(val, minValue, maxValue),
          itemStyle: { color: 'rgba(0,121,255,0.3)', borderColor: '#0079FF', borderWidth: 1 },
        },
        {
          name: '无进场',
          type: 'scatter',
          data: Array.from({ length: 10 }, () => Math.floor(Math.random() * 100)),
          symbolSize: (val: any) => calculateBubbleSize(val, minValue, maxValue),
          itemStyle: { color: 'rgba(233,38,240,0.3)', borderColor: '#E926F0', borderWidth: 1 },
        },
        {
          name: '三天未打卡',
          type: 'scatter',
          data: Array.from({ length: 10 }, () => Math.floor(Math.random() * 100)),
          symbolSize: (val: any) => calculateBubbleSize(val, minValue, maxValue),
          itemStyle: { color: 'rgba(245,151,60,0.3)', borderColor: '#F5973C', borderWidth: 1 },
        },
        {
          name: '未打卡',
          type: 'scatter',
          data: Array.from({ length: 10 }, () => Math.floor(Math.random() * 100)),
          symbolSize: (val: any) => calculateBubbleSize(val, minValue, maxValue),
          itemStyle: { color: 'rgba(243,15,53,0.3)', borderColor: '#F30F35', borderWidth: 1 },
        },
      ],
    };
    chartInstance.setOption(option);
  };

  const resizeChart = () => chartInstance && chartInstance.resize();

  useEffect(() => {
    queryData();
  }, []);

  useEffect(() => {
    if (chartRef.current && chartData.length > 0) {
      chartInstance = getEChartsInstance(chartRef);
      setOptions([
        { name: '各工种', data: chartData.map(item => item.value) },
        { name: '无进场', data: chartData.map(item => item.value) },
        { name: '三天未打卡', data: chartData.map(item => item.value) },
        { name: '未打卡', data: chartData.map(item => item.value) },
      ]);
      resizeChart();
      setSpinning(false);
    }
  }, [chartData, chartRef.current]);

  useEffect(() => {
    window.addEventListener('resize', resizeChart);
    return () => {
      chartInstance && chartInstance.dispose();
      window.removeEventListener('resize', resizeChart);
    };
  }, []);

  return (
    <Spin wrapperClassName="cus-spin" tip="加载中" spinning={spinning}>
      <div className="flex justify-center items-center h-full">
        {!chartData.length && <div className="color-#409eff">暂无数据</div>}
        <div
          className={`w-full h-full ${!chartData.length && 'hidden'}`}
          ref={chartRef}
        />
      </div>
    </Spin>
  );
};

export default SomeChartComponent;