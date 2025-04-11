import { useEffect, useRef } from 'react';
import { useECharts } from '@/context/EChartContext';

interface Props {
  data?: any[];
}

const SomeChartComponent = (props: Props) => {
  const { getEChartsInstance } = useECharts();
  const chartRef = useRef(null);
  const data1: any[] = [
    // { value: 20, name: '本科' },
    // { value: 30, name: '高中' },
    // { value: 10, name: '硕士' },
  ];

  // const data2 = [
  //   { value: 20, name: '20-30岁' },
  //   { value: 30, name: '30-40岁' },
  //   { value: 10, name: '40-50岁' },
  //   { value: 10, name: '50-60岁' },
  //   { value: 10, name: '60岁以上' },
  // ];
  console.log('chartData', props.data);
  const data2 = props.data || [];

  let chartInstance: any = null;

  const setOptions = () => {
    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {d}%',
      },
      legend: {
        icon: 'circle',
        itemWidth: 10,
        orient: 'vertical',
        top: 'center',
        right: 'right',
        itemGap: 16,
        textStyle: {
          align: 'left',
          verticalAlign: 'middle',
        },
        data: data2.map((item) => item.name),
      },
      series: [
        {
          name: '建筑工人构成分析',
          type: 'pie',
          radius: [0, '40%'],
          label: {
            position: 'inner',
            fontSize: 12,
            color: '#fff',
          },
          labelLine: {
            show: false,
          },
          data: data1,
        },
        {
          name: '年龄分析',
          type: 'pie',
          radius: ['60%', '80%'],
          labelLine: {
            // length: 30,
          },
          data: data2,
        },
      ],
    };
    chartInstance.setOption(option);
  };

  const resizeChart = () => chartInstance.resize();

  useEffect(() => {
    chartInstance = getEChartsInstance(chartRef);
    setOptions();
  }, [props.data]);

  useEffect(() => {
    window.addEventListener('resize', resizeChart);
    return () => {
      chartInstance.dispose();
      window.removeEventListener('resize', resizeChart);
    };
  }, []);

  return <div ref={chartRef} className="w-full h-full"></div>;
};

export default SomeChartComponent;
