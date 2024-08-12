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
    leftDistance: 50,
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
    chartInstance.resize()
  }, [chartData]);

  const setOptions = () => {
    setSpinning(true);
    const option = {
      title: {
        text: props.title,
        textAlign: 'center',
        top: '45%', // 描述怎么根据父元素进行定位。top 和 bottom 只有一个可以生效。如果指定 top 或 bottom，则 shape 里的 y、cy 等定位属性不再生效。『父元素』是指：如果是顶层元素，父元素是 echarts 图表容器。如果是 group 的子元素，父元素就是 group 元素。
        left: `${config.leftDistance - 2}%`,
        textStyle: {
          color: '#00e9ea',
          fontSize: 16,
          // fontWeight: 'bold',
        },
      },
      grid: {
        left: '1%',
        right: '1%',
        top: '20%',
        bottom: '3%',
        containLabel: true,
      },
      // legend: {},
      tooltip: {},
      series: [
        {
          name: '人数',
          type: 'pie',
          center: [`${config.leftDistance}%`, '50%'],
          radius: ['45%', '55%'],
          // roseType: 'area',
          itemStyle: {
            borderRadius: 20,
          },
          label: {
            formatter: (params: any) => {
              return params.name + params.value + '人';
              if (params.name.length > 5) {
                return `${params.name.slice(0, 3)}...`; // `${params.slice(0, 5)}...`;
              } else {
                return params.name + params.value + '人'; //+ "\n"
              }
            },
          },
          data: addPieColor(),
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
