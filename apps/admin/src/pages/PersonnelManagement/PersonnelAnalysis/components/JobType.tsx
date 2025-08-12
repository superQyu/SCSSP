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
    const res = await P.getCurrentAttendanceStatistic();
    setChartData(res.sort((a,b)=>b.companyName.length -  a.companyName.length));
  };

  const setOptions = () => {
    setSpinning(true);

    const xAxis = chartData.map((item) => `${item.companyName}`);
    const data1 = chartData.map(
      (item) => item.companyRegisterUserNum || 0
    );
    const data2 = chartData.map(
      (item) => item.companyCurrentAttendanceNum || 0
    );

    const option = {
      // 控制图表网格间距，避免内容贴边
      grid: {
        top: '14%',
        bottom: '12%',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        formatter: function (params) {
          // 自定义tooltip内容，显示类目和各系列数据
          let res = `${params[0].name}<br/>`;
          params.forEach((item) => {
            res += `${item.seriesName}: ${item.value}<br/>`;
          });
          return res;
        },
      },
      // 图例配置，区分不同数据系列
      // legend: {
      //   icon: 'circle',
      //   data: ['计划总数', '实到数', '已验收'],
      //   itemWidth: 6,
      //   itemHeight: 6,
      //   top: 0, // 图例位置，可按需调整
      //   right: '10px',
      // },
      // 直角坐标系配置
      xAxis: {
        type: 'category',
        data: xAxis,
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: '#999',
          interval: 0,
          margin: 10,
          formatter: (str) => {
            if (str.length > 5) {
              // 长度超过5时截断
              return str.substring(0, 5) + '...'; // 保留前5个字符并添加省略号
            }
            return str; // 长度正常时直接返回原文本
          },
        },
        axisLine: {
          show: true,
          lineStyle: {
            type: 'line',
            color: '#AAAAAA',
          },
        },
      },
      yAxis: {
        type: 'value',
        name: '人数',
        nameGap: 20,
        nameTextStyle: {
          color: '#999',
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: '#999',
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'line',
          },
        },
      },
      // 系列数据配置，核心的堆叠柱状图
      series: [
        {
          name: '注册人数',
          type: 'bar',
          barWidth: 30,
          barGap: '-76%',
          color: '#5b9ff3',
          data: data1,
          label: {
            show: true,
            position: 'top',
            distance: 15 ,
          },
        },
        {
          name: '履约人数',
          type: 'bar',
          barWidth: 16,
          color: '#2fc699',
          data: data2,
          label: {
            show: true,
            position: 'top',
          },
        },
      ],
    };
    chartInstance.setOption(option);
    setSpinning(false);
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
