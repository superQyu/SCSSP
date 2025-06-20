import React, { useRef, useEffect } from 'react';
import * as echarts from 'echarts';

// 定义组件接收的数据类型
interface EchartsScatterProps {
  data: {
    工种: string; // 工种名称
    各工种: number; // 可根据实际代表含义调整，比如某种统计值
    无进场: number;
    无打卡: number;
    未打卡: number;
  }[];
}

const EchartsScatter: React.FC<EchartsScatterProps> = ({
  data = [
    {
      工种: '工种1',
      各工种: Math.floor(Math.random() * 100),
      无进场: Math.floor(Math.random() * 100),
      无打卡: Math.floor(Math.random() * 100),
      未打卡: Math.floor(Math.random() * 100),
    },
    {
      工种: '工种2',
      各工种: Math.floor(Math.random() * 100),
      无进场: Math.floor(Math.random() * 100),
      无打卡: Math.floor(Math.random() * 100),
      未打卡: Math.floor(Math.random() * 100),
    },
    {
      工种: '工种3',
      各工种: Math.floor(Math.random() * 100),
      无进场: Math.floor(Math.random() * 100),
      无打卡: Math.floor(Math.random() * 100),
      未打卡: Math.floor(Math.random() * 100),
    },
    {
      工种: '工种4',
      各工种: Math.floor(Math.random() * 100),
      无进场: Math.floor(Math.random() * 100),
      无打卡: Math.floor(Math.random() * 100),
      未打卡: Math.floor(Math.random() * 100),
    },
  ],
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  let myChart: echarts.ECharts | null = null;

  useEffect(() => {
    myChart = echarts.init(chartRef.current as HTMLDivElement);

    const option = {
      color: [
        '#4C9EF9',
        '#00AEFF',
        '#59D7AC',
        '#F96D4C',
        '#f19300',
        '#ffc425',
        '#47bd44',
        '#6fd9d0',
        '#94989e',
      ],
      tooltip: {},
      series: [
        {
          type: 'sankey',
          draggable: false,
          left: '8%',
          right: '8%',
          data: [
            //左点
            { name: '工种1', label: { position: 'left' } },
            { name: '工种2', label: { position: 'left' } },
            { name: '工种3', label: { position: 'left' } },
            { name: '工种4', label: { position: 'left' } },
            { name: '工种5', label: { position: 'left' } },

            // { name: '工种6', label: { position: 'left' } },
            //右点
            { name: '5% ', label: { position: 'right' } },
            { name: '6% ', label: { position: 'right' } },
            { name: '5% ', label: { position: 'right' } },
            { name: '5%', label: { position: 'right' } },
          ],
          links: [
            {
              source: '工种1',
              target: '劳务公司1 ',
              value: 18.68,
            },
            {
              source: '工种1',
              target: '劳务公司2 ',
              value: 12.38,
            },
            {
              source: '工种1',
              target: '劳务公司3 ',
              value: 30.36,
            },
            {
              source: '工种2',
              target: '劳务公司1 ',
              value: 12.48,
            },
            {
              source: '工种2',
              target: '劳务公司2 ',
              value: 12.67,
            },
            {
              source: '工种3',
              target: '劳务公司3 ',
              value: 13.47,
            },
            { source: '工种3', target: '劳务公司4 ', value: 11.03 },
            {
              source: '工种4',
              target: '劳务公司2 ',
              value: 19.11,
            },
            {
              source: '工种5',
              target: '劳务公司3 ',
              value: 15.02,
            },
            {
              source: '工种5',
              target: '劳务公司4 ',
              value: 11.66,
            },
     
          ],
          label: {
            color: '#333333',
            fontSize: 14,
            fontWeight: '400',
          },
          itemStyle: {},
          lineStyle: {
            // normal: {
              color: 'gradient',
              borderColor: 'black',
              borderWidth: 0,
              opacity: 0.3,
              curveness: 0.6,
            // },
          },
        },
      ],
    };

    // 设置配置项
    myChart.setOption(option);

    // 监听窗口变化，自适应图表大小
    const resizeHandler = () => {
      myChart?.resize();
    };
    window.addEventListener('resize', resizeHandler);

    return () => {
      // 组件卸载时销毁 ECharts 实例和移除事件监听
      myChart?.dispose();
      window.removeEventListener('resize', resizeHandler);
    };
  }, [data]);

  return (
    <div
      ref={chartRef}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default EchartsScatter;
