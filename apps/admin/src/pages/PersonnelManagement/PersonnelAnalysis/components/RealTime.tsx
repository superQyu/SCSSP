import { useEffect, useRef, useState } from 'react';
import { Spin } from 'antd';
import { useECharts } from '@/context/EChartContext';
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

const SomeChartComponent = () => {
  const { server } = useBasicConfiguration();
  const { personAnalysis: P } = server;
  const { getEChartsInstance } = useECharts();

  const chartRef = useRef(null);
  const [spinning, setSpinning] = useState(true);
  const [chartData, setChartData] = useState<any[]>([]);
  let chartInstance: any = null;

  const MAX_BUBBLE_SIZE = 12;
  const MIN_BUBBLE_SIZE = 4;

  const queryData = async () => {
    const res = await P.selectAttendanceDailtStatistics();
    const list = res.map((item: any) => {
      return {
        name: item.companyName,
        value: item.todayCount,
      }
    }).sort((a,b)=>b.name.length -  a.name.length)
    setChartData(list);
  };

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

  const setOptions = () => {
    const allValues = chartData.flatMap((item) => item.value);
    const minValue = Math.min(...allValues);
    const maxValue = Math.max(...allValues);
    const xAxis = chartData.map((item) => item.name);
    const option = {
      grid: {
        containLabel: true,
        right: 20,
        left: 20,
        top: '23%',
        bottom: '2%',
      },
      legend: { right: 0 },
      tooltip: {
        confine: true,
        trigger: 'item',
        formatter: (params: any) =>
          `${params.name}<br/>${params.seriesName}人数：${params.value}人`,
      },
      xAxis: {
        type: 'category',
        data: xAxis,
        axisTick: { show: false },
        axisLabel: {
          color: '#999',
          interval: 0,
          margin: 10,
          formatter: (str) => {
            if (str.length > 5) {
              return str.substring(0, 5) + '...';
            }
            return str;
          },
        },
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
          name: '进场',
          type: 'scatter',
          data: allValues,
          symbolSize: (val: any) =>
            calculateBubbleSize(val, minValue, maxValue),
          itemStyle: {
            color: 'rgba(233,38,240,0.3)',
            borderColor: '#E926F0',
            borderWidth: 1,
          },
        },

        // {
        //   name: '无退场',
        //   type: 'scatter',
        //   data: Array.from({ length: 10 }, () =>
        //     Math.floor(Math.random() * 100)
        //   ),
        //   symbolSize: (val: any) =>
        //     calculateBubbleSize(val, minValue, maxValue),
        //   itemStyle: {
        //     color: 'rgba(243,15,53,0.3)',
        //     borderColor: '#F30F35',
        //     borderWidth: 1,
        //   },
        // },
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
    if (chartRef.current) {
      chartInstance = getEChartsInstance(chartRef);
      setOptions();
      resizeChart();
      setSpinning(false);
    }
  }, [chartRef.current, chartData]);

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
