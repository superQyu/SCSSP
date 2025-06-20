import { useEffect, useRef } from 'react';
import { useECharts } from '@/context/EChartContext';
import { Spin } from 'antd';
import { useState } from 'react';
import { cloneDeep } from 'lodash';

interface Props {
  /** 中心文本 */
  title?: string;
  data?: any[];
}
interface Config {
  /** 饼图圆心距 div 最左侧的距离 % */
  leftDistance: number;
  /** 所有图例的颜色 */
  color?: string[];
}

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
  } = props;

  const { getEChartsInstance, getLinearGradient } = useECharts();

  const chartRef = useRef(null);

  const [spinning, setSpinning] = useState(true);
  const [config, setConfig] = useState<Config>({
    leftDistance: 40,
    color: [
      '#fb497b',
      '#fec760',
      '#3ce09b',
      '#4bcdff',
      '#4f7bf5',
      '#9a60b4',
      '#ea7ccc',
      '#5470c6',
      '#fac858',
      '#73c0de',
      '#3ba272',
      '#91cc75',
      '#fac858',
    ],
  });

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
    const option = {
      title: [
        {
          text: `${20}%`,
          left: `${config.leftDistance}%`,
          top: '45%',
          textAlign: 'center',
          textVerticalAlign: 'middle',
          textStyle: {
            fontSize: 30,
            fontWeight: 'bold',
            color: '#000',
            fontFamily: 'DINAlternate',
          },
        },
        {
          text: '持证率',
          left: `${config.leftDistance}%`,
          top: '55%',
          textAlign: 'center',
          textVerticalAlign: 'middle',
          textStyle: {
            fontSize: 14,
            color: '#666',
          },
        },
      ],
      grid: {
        left: '1%',
        right: '1%',
        top: '20%',
        bottom: '20%', // 底部留 20% 空间
      },
      legend: {
        type: 'scroll',
        top: '5%',
        bottom: '15%',
        right: 0,
        with: 60,
        orient: 'vertical',
        backgroundColor: 'rgba(89, 141, 210, 0.13)',
        borderRadius: 10,
        padding: 10,
        itemGap: 5,
        itemWidth: 8,
        itemHeight: 8,
      },
      tooltip: {},
      series: [
        {
          name: '人数',
          type: 'pie',
          center: [`${config.leftDistance}%`, '50%'],
          radius: ['45%', '60%'],
          label: {
            position: 'outer',
            formatter: (params: any) => {
              return params.name + params.value + '人';
              if (params.name.length > 5) {
                return `${params.name.slice(0, 3)}...`; // `${params.slice(0, 5)}...`;
              } else {
                return params.name + params.value + '人'; //+ "\n"
              }
            },
          },
          labelLine: {
            show: true,
            // length: 10, // 第一段引线长度（缩短减少延伸）
            // length2: 20, // 第二段引线长度（缩短减少延伸）
            // maxSurfaceDistance: 20, // 引线在饼图表面最大距离（避免过长）
          },
          data: addPieColor(),
        },
        {
          type: 'pie',
          center: [`${config.leftDistance}%`, '50%'],
          radius: ['0', '40%'],
          itemStyle: {
            color: 'rgba(102, 102, 102, 0.08)',
          },
          labelLine: {
            show: false,
          },
          hoverAnimation: false,
          data: [1],
        },
      ],
    };
    chartInstance.setOption(option);
    setSpinning(false);
  };

  const addPieColor = () => {
    const _color = config.color as [];
    const list = cloneDeep(chartData);
    const _filter =
      list.length > 0
        ? list.sort((a, b) => {
            return b.value - a.value;
          })
        : [];
    _filter.forEach((item, index) => {
      item['itemStyle'] = {
        color: _color[index],
      };
      item['label'] = {
        color: _color[index],
      };
    });
    return _filter;
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
