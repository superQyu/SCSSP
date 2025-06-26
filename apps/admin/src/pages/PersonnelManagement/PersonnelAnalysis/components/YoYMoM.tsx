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

  const queryData = async () => {
    const res = await P.selectAttendanceDailtStatistics();

    setChartData(res);
  };

  const setOptions = () => {
    const todayValues = chartData.flatMap(
      (item) => item.todayCount
    );
    const yesterdayValues = chartData.flatMap(
      (item) => item.yesterdayCount
    );
    const lastMonthValues = chartData.flatMap(
      (item) => item.lastMonthSameDayCount
    );
    const xAxis = chartData.map((item) => item.companyName);
    const option = {
      color: ['#2b90ff', '#ffc601', '#2fc699'],
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
          name: '今日进场',
          type: 'bar',
          barWidth: 10,
          data: todayValues,
        },
        {
          name: '昨日进场',
          type: 'bar',
          barWidth: 10,
          data: yesterdayValues,
        },
        {
          name: '上月今日进场',
          type: 'bar',
          barWidth: 10,
          data: lastMonthValues,
        },
        // {
        //   name: '昨日无退场',
        //   type: 'bar',
        //   data: [61, 292, 313, 222],
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
