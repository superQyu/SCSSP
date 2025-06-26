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
  const { data: chartData, unit } = props;

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
    console.log('chartData', chartData);
    const xAxis = chartData.map((item) => `${item.label}`);

    // 提取三个系列的数据
    const plannedData = chartData.map(
      (item) => item.planNumber || 0
    );
    const acceptedData = chartData.map(
      (item) => item.acceptNumber || 0
    );
    const actualData = chartData.map(
      (item) => item.enterNumber || 0
    );
    const option = {
      // 控制图表网格间距，避免内容贴边
      grid: {
        left: '3%',
        right: '4%',
        bottom: '10%',
        top: '10%',
        containLabel: true,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        formatter: function (params) {
          let res = `${params[0].name}<br/>`;
          params.forEach((item) => {
            res += `${item.seriesName}: ${item.value}  ${
              chartData?.[item.dataIndex].measuringUnit
            }<br/>`;
          });
          return res;
        },
      },
      dataZoom: [
        {
          type: 'slider',
          xAxisIndex: 0,
          show: xAxis.length > 10,
          start: 0,
          end: 100 * (8 / Math.max(8, xAxis.length)), // 默认显示8个标签
          height: 8,
          bottom: 5,
          borderColor: 'transparent',
          backgroundColor: '#f5f7fa',
          fillerColor: 'rgba(99, 146, 255, 0.2)',
          handleStyle: {
            color: '#6392FF',
            borderColor: '#6392FF',
            width: 10,
            height: 8,
          },
          textStyle: {
            color: '#999',
          },
        },
        {
          type: 'inside',
          xAxisIndex: 0,
          zoomOnMouseWheel: false, // 禁用鼠标滚轮缩放
          moveOnMouseMove: true, // 启用鼠标拖动
          moveOnMouseWheel: true, // 启用鼠标滚轮平移
        },
      ],
      // 图例配置，区分不同数据系列
      legend: {
        icon: 'circle',
        data: ['计划总数', '实到数', '已验收'],
        itemWidth: 6,
        itemHeight: 6,
        top: 0, // 图例位置，可按需调整
        right: '10px',
      },
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
          formatter: function (value) {
            if (!value) return '';
            const parts = value.split('|');
            if (parts.length === 1) {
              return value;
            }
            return [`${parts[0]}`, `${parts[1]}`].join('\n');
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
        name: unit,
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
          barWidth: 20,
          barGap: '-100%',
          color: '#D0DEFF', // 浅蓝色，模拟示例图的计划总数颜色
          data: plannedData, // 模拟计划总数数据，按需替换
        },
        {
          name: '已验收',
          type: 'bar',
          barWidth: 20,
          color: '#86DF6C', // 浅绿色，模拟已验收颜色
          data: acceptedData, // 模拟已验收数据，按需替换
        },
        {
          name: '实到数',
          type: 'bar',
          barWidth: 20,
          color: '#6392FF', // 深蓝色，模拟实到数颜色
          data: actualData, // 模拟实到数数据，按需替换
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
        {!chartData?.length && (
          <div className="color-#409eff">暂无数据</div>
        )}
        <div
          className={`w-full h-full ${
            !chartData?.length && 'hidden'
          }`}
          ref={chartRef}
        ></div>
      </div>
    </Spin>
  );
};
