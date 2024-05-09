import React, { useEffect } from 'react';
import * as echarts from 'echarts';

const MyChartComponent = () => {
  let myChart: any;

  var chartData = {
    value: 30,
    total: 100,
  };

  const data1 = [
    { value: 20, name: '本科' },
    { value: 30, name: '高中' },
    { value: 10, name: '硕士' },
  ];

  const data2 = [
    { value: 20, name: '20-30岁' },
    { value: 30, name: '30-40岁' },
    { value: 10, name: '40-50岁' },
    { value: 10, name: '50-60岁' },
    { value: 10, name: '60岁以上' },
  ];

  let max = chartData.total;
  let value = chartData.value;
  const init = () => {
    const chartDom = document.getElementById('myChart3');
    myChart = echarts.init(chartDom);
    setOptions();
  };

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
        data: data2.map(item => item.name),
      },
      series: [
        {
          name: '建筑工人构成分析',
          type: 'pie',
          radius: [0, '40%'],
          label: {
            position: 'inner',
            fontSize: 12,
            color: '#fff'
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
            length: 30,
          },
          data: data2,
        },
      ],
    };
    myChart.setOption(option);
  };

  useEffect(() => {
    init();
    return () => {
      myChart.dispose();
    };
  }, []);

  return <div id="myChart3" className="w-full h-full" />;
};

export default MyChartComponent;
