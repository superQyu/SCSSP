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
    const res = await P.getLoginCountByMonth();
    const list = res.map((item: any) => {
      return {
        name: item.userName,
        value: item.loginCount,
      };
    });
    setChartData(list);
  };

  const setOptions = () => {
    const xAxis = chartData.map((item) => item.name);
    const data = chartData.map((item) => item.value);
    const option = {
      color: ['#838ffa'],
      grid: {
        // containLabel: true,
        left: '15%',
        right: '1%',
        top: '10%',
        bottom: '28%',
      },
      xAxis: {
        type: 'category',
        axisLine: {
          show: false,
          color: '#aaa',
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: '#aaa',
          width: 100,
          formatter: (str: string) => {
            if (str.length > 5) {
              return str.substring(0, 5) + '...';
            }
            return str;
          },
        },
        splitLine: {
          show: false,
        },
        data: xAxis,
      },

      yAxis: {
        name: '人数',
        type: 'value',
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed', //虚线
            color: '#00BFF3',
            opacity: 0.23,
          },
        },
        axisLine: {
          show: false,
        },
        axisLabel: {
          show: true,
          margin: 20,
          textStyle: {
            color: '#aaa',
          },
        },
        axisTick: {
          show: false,
        },
      },

      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c}人',
      },
      series: [
        {
          type: 'line',
          data: data,
          smooth: true,
          itemStyle: {
            color: '#ffd159',
          },
        },
        {
          type: 'bar',
          barMaxWidth: 15,
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
      setOptions();
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
      <div className="flex justify-center items-center h-full ">
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
