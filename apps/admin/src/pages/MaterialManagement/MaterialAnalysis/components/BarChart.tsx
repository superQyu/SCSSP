import { useEffect, useRef } from 'react';
import { useECharts } from '@/context/EChartContext';
import { Spin } from 'antd';
import { useState } from 'react';

interface Props {
  data?: any[];
  unit: string;
}
interface Config {}

export default (props: Props) => {
  const {
    data: chartData = [
      { name: '木工', value: 72 },
      { name: '建筑电工', value: 71 },
      { name: '起重信号工', value: 47 },
      { name: '钢筋工', value: 34 },
      { name: '混凝土工', value: 68 },
      { name: '除尘工', value: 68 },
    ],
    unit,
  } = props;

  const { getEChartsInstance, getLinearGradient } = useECharts();

  const config: Config = {};
  const chartRef = useRef(null);

  const [spinning, setSpinning] = useState(true);

  let chartInstance: any = null;

  useEffect(() => {
    if (!chartInstance) {
      chartInstance = getEChartsInstance(chartRef);
    }
    window.addEventListener('resize', () =>
      chartInstance.resize()
    );
    return () => {
      chartInstance.dispose();
      window.removeEventListener('resize', () =>
        chartInstance.resize()
      );
    };
  }, []);
  useEffect(() => {
    if (!chartInstance) {
      chartInstance = getEChartsInstance(chartRef);
    }
    setConfig();
    setOptions();
    chartInstance.resize();
  }, [chartData, unit]);

  const setConfig = () => {};

  const setOptions = () => {
    setSpinning(true);
    const xAxis = chartData.map((item: any) => item.name);
    const data = chartData.map((item: any) => item.value);
    const option = {
      // 控制图表网格间距，避免内容贴边
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
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
      legend: {
        icon: 'circle',
        data: ['计划总数', '已验收', '实到数'],
        itemWidth: 6,
        itemHeight: 6,
        top: 0, // 图例位置，可按需调整
        right: '10px',
      },
      // 直角坐标系配置
      xAxis: {
        type: 'category',
        data: [
          '物料1',
          '物料2',
          '物料3',
          '物料4',
          '物料5',
          '物料6',
          '物料7',
        ],
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: '#999',
          interval: 0,
          margin: 10,
          // rotate: -25,
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
        name: '数量',
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
          name: '计划总数',
          type: 'bar',
          barWidth: 15,
          stack: '总量', // 关键：相同 stack 值实现堆叠
          color: 'rgba(181, 216, 255, 0.8)', // 浅蓝色，模拟示例图的计划总数颜色
          data: [2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5], // 模拟计划总数数据，按需替换
        },
        {
          name: '已验收',
          type: 'bar',
          stack: '总量',
          color: 'rgb(144, 238, 144)', // 浅绿色，模拟已验收颜色
          data: [0.8, 1.2, 0.9, 0.2, 0.8, 1.4, 0.5], // 模拟已验收数据，按需替换
        },
        {
          name: '实到数',
          type: 'bar',
          stack: '总量',
          color: 'rgb(100, 149, 237)', // 深蓝色，模拟实到数颜色
          data: [0.5, 0.5, 1.0, 1.1, 0.5, 0.2, 0.3], // 模拟实到数数据，按需替换
        },
      ],

    };
    chartInstance.setOption(option);
    setSpinning(false);
  };

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
