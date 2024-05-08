import React, { useEffect } from 'react';
import * as echarts from 'echarts';

const MyChartComponent = () => {
  let myChart: any;

  var chartData = {
    value: 30,
    total: 100,
  };

  let max = chartData.total;
  let value = chartData.value;
  const init = () => {
    const chartDom = document.getElementById('myChart3');
    myChart = echarts.init(chartDom);
    setOptions();
  };

  const setOptions = () => {
    const option = {
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
      polar: {
        radius: '130%',
        center: ['50%', '50%'],
      },
      series: [
        // 极坐标系下柱状图
        // 实际值
        {
          type: 'bar',
          data: [value],
          z: 1,
          coordinateSystem: 'polar',
          barMaxWidth: 30,
          name: '劳务信息',
          roundCap: 1,
          color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
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
        },
        // 背景图形
        {
          type: 'bar',
          data: [max],
          z: 0,
          silent: true,
          coordinateSystem: 'polar',
          barMaxWidth: 30,
          roundCap: true,
          color: '#26ff00',
          barGap: '-100%',
        },
        // 尾端小圆点 饼图
        {
          type: 'pie',
          radius: '127%',
          center: ['50%', '50%'],
          hoverAnimation: false,
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
