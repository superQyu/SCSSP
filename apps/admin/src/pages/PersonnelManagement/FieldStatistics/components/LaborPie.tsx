import { useEffect, useRef } from 'react';
import { useECharts } from '@/context/EChartContext';
import { Spin } from 'antd';
import { useState } from 'react';

interface Props {
  /** { total: 100, value: 30 } */
  data?: any;
}

const SomeChartComponent = (props: Props) => {
  const { data: chartData = { total: 100, value: 30 } } = props;

  const { getEChartsInstance, getLinearGradient } = useECharts();
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
    setOptions();
    chartInstance.resize();
  }, [chartData]);

  const setOptions = () => {
    setSpinning(true);
    // total 为出勤人数 + 在场人数
    // value 最终计算的应该是相对于 100 来说的数值比例
    const value = (
      (chartData.value / chartData.total) *
      100
    ).toFixed(0);
    const option = {
      polar: {
        radius: '130%',
        center: ['50%', '50%'],
      },
      angleAxis: {
        axisLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        min: 0,
        max: 100,
        startAngle: 90,
      },
      radiusAxis: {
        type: 'category',
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: true,
        },
        data: [],
      },
      series: [
        {
          type: 'bar',
          data: [value],
          z: 1,
          coordinateSystem: 'polar',
          barMaxWidth: 30,
          name: '劳务信息',
          roundCap: 1,
          color: getLinearGradient(0, 1, 0, 0, [
            {
              offset: 0,
              color: '#0185f5',
            },
            {
              offset: 0.5,
              color: '#058fe0',
            },
            {
              offset: 1,
              color: '#099dc2',
            },
          ]),
          label: {
            show: true,
            position: 'right',
            formatter: () => chartData.value,
          },
        },
        // 背景图形
        {
          type: 'bar',
          data: [100],
          z: 0,
          silent: true,
          coordinateSystem: 'polar',
          barMaxWidth: 30,
          roundCap: true,
          color: '#26ff00',
          barGap: '-100%',
          label: {
            show: true,
            position: 'left',
            formatter: () => chartData.total - chartData.value,
          },
        },
        // 尾端小圆点 饼图
        {
          type: 'pie',
          radius: '127%',
          center: ['50%', '50%'],
          emphasis: {
            scale: false,
          },
          startAngle: 180,
          endAngle: 0,
          silent: 1,
          z: 6,
          data: [
            {
              value: 0.51,
              itemStyle: {
                color: 'transparent',
              },
            },
            {
              value: 0,
              label: {
                position: 'inside',
                backgroundColor: '#ffffff',
                borderRadius: 12,
                padding: 12,
              },
            },
            {
              value: 0.49,
              itemStyle: {
                color: 'transparent',
              },
            },
          ],
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
        {!chartData.total && (
          <div className="color-#409eff">暂无数据</div>
        )}
        <div
          className={`w-full h-full ${
            !chartData.total && 'hidden'
          }`}
          ref={chartRef}
        ></div>
      </div>
    </Spin>
  );
};

export default SomeChartComponent;
