import { useEffect, useRef } from 'react';
import { useECharts } from '@/context/EChartContext';
import { Spin } from 'antd';
import { useState } from 'react';

interface Props {
  /** 中心文本 */
  title?: string;
  data: any[];
}
interface Config {
  leftDistance: number;
  /** 饼图中心标题配置 */
  title?: {
    text?: string;
  };
}

export default (props: Props) => {
  const { getEChartsInstance, getLinearGradient } = useECharts();

  const chartRef = useRef(null);

  const [spinning, setSpinning] = useState(true);
  const [config, setConfig] = useState<Config>({
    leftDistance: 50,
  });
  const { title } = config;

  let chartInstance: any = null;

  useEffect(() => {
    chartInstance = getEChartsInstance(chartRef);
    setOptions();
    setSpinning(false);
  }, []);
  useEffect(() => {
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
  // useEffect(() => {
  //   setConfig({
  //     title: {
  //       text: props.title || '工种分析',
  //     },
  //   });
  // }, [props.title]);

  const setOptions = () => {
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
      series: [
        {
          name: '面积模式',
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
  };

  const addPieColor = () => {
    let _color = [
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
      _filter =
        props.data.length > 0
          ? props.data.sort((a, b) => {
              return b.value - a.value;
            })
          : [];
    _filter.map((item, index) => {
      item['itemStyle'] = {
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
      <div ref={chartRef} className="w-full h-full"></div>
    </Spin>
  );
};
