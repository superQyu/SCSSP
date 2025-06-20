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
    const data = transformToChartData(chartData);
    console.log('data', data);
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
        data: data.xAxis,
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
          barWidth: 30, // 统一宽度
          barGap: '-100%',
          // barGap: '0%', // 同类目内柱子无间距
          color: 'rgba(181, 216, 255, 0.8)',
          data: data.plannedData,
        },
        {
          name: '实到数',
          type: 'bar',
          barWidth: 30,

          color: 'rgb(100, 149, 237)',
          data: data.actualData,
        },
        {
          name: '已验收',
          type: 'bar',
          barWidth: 30,

          color: 'rgb(144, 238, 144)',
          data: data.acceptedData,
        },
      ],
    };
    chartInstance.setOption(option);
    setSpinning(false);
  };

  /**
   * 将物料数据转换为 ECharts 堆叠柱状图所需的格式
   * @param {Object} materialData - 物料数据对象，包含 enter、plan、accept 数组
   * @returns {Object} - 转换后的图表数据
   */
  function transformToChartData(materialData) {
    // 确保数据存在且有计划数据
    if (
      !materialData ||
      !Array.isArray(materialData.plan) ||
      materialData.plan.length === 0
    ) {
      return {
        xAxis: [],
        series: [
          { name: '计划总数', data: [] },
          { name: '已验收', data: [] },
          { name: '实到数', data: [] },
        ],
      };
    }

    // 提取 x 轴数据（物料名称）
    const xAxis = materialData.plan.map(
      (item) =>
        `${item.materialName} ${
          item.specification ? `(${item.specification})` : ''
        }`
    );

    // 提取三个系列的数据
    const plannedData = materialData.plan.map(
      (item) => item.planNumber || 0
    );
    const acceptedData = materialData.plan.map(
      (item) => item.acceptNumber || 0
    );
    const actualData = materialData.plan.map(
      (item) => item.count || 0
    );

    // 返回 ECharts 配置所需的数据结构
    return {
      xAxis,
      plannedData,
      acceptedData,
      actualData,

      unit: materialData.plan[0]?.measuringUnit || '', // 尝试从第一个物料获取单位
    };
  }

  return (
    <Spin
      wrapperClassName="cus-spin"
      tip="加载中"
      spinning={spinning}
    >
      <div className="flex justify-center items-center h-full">
        {!chartData?.enter?.length &&
          !chartData?.plan?.length &&
          !chartData?.accept?.length && (
            <div className="color-#409eff">暂无数据</div>
          )}
        <div
          className={`w-full h-full ${
            !chartData?.enter?.length &&
            !chartData?.plan?.length &&
            !chartData?.accept?.length &&
            'hidden'
          }`}
          ref={chartRef}
        ></div>
      </div>
    </Spin>
  );
};
