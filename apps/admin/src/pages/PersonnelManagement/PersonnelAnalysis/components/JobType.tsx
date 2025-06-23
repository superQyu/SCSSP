import { useEffect, useRef, useState } from 'react';
import { Spin } from 'antd';

import { useECharts } from '@/context/EChartContext';
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';

const SomeChartComponent = () => {
  const { server } = useBasicConfiguration();
  const { personAnalysis:P } = server;
  const { getEChartsInstance } = useECharts();

  const chartRef = useRef(null);
  const [spinning, setSpinning] = useState(true);
  const [chartData, setChartData] = useState<any[]>([]);

  let chartInstance: any = null;

  const queryData = async () => {
    const res = await P.getCurrentAttendanceStatistic();
    const sankeyData = processDataForSankey(res);

    setChartData(sankeyData.nodes);
    setOptions(sankeyData.nodes, sankeyData.links);
  };

  function processDataForSankey(sourceData) {
    const nodes = new Set();
    let sankeyNodes = [];
    
    sourceData.forEach((item) => {
      if (!nodes.has(item.source)) {
        nodes.add(item.source);
        sankeyNodes.push({
          name: item.source,
          label: { position: 'left' },
        });
      }
      if (!nodes.has(item.target)) {
        nodes.add(item.target);
        sankeyNodes.push({
          name: item.target,
          label: { position: 'center' },
        });
      }
      if (!nodes.has(item.value)) {
        nodes.add(item.value);
        sankeyNodes.push({
          name: `${item.value}`,
          label: { position: 'right' },
        });
      }
    });

    // const sankeyNodes = Array.from(nodes).map((name, index) => ({
    //   name: name,
    // }));

    const sankeyLinks = sourceData.flatMap((item) => {
      return [
        {
          source: item.source,
          target: item.target,
          value: item.value,
        },
        {
          source: item.target,
          target: `${item.value}`,
          value: item.value,
        },
      ];
    });

    return {
      nodes: sankeyNodes,
      links: sankeyLinks,
    };
  }

  const setOptions = (data: any, link) => {
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
          data: data,
          links: link,
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
    chartInstance.setOption(option);
  };

  const resizeChart = () => chartInstance.resize();

  useEffect(() => {
    queryData();
  }, []);

  // useEffect(() => {
  //   if (chartRef.current) {
  //     chartInstance = getEChartsInstance(chartRef);
  //     // setOptions();
  //     resizeChart();
  //     setSpinning(false);
  //   }
  // }, [chartData, chartRef.current]);

  useEffect(() => {
    window.addEventListener('resize', resizeChart);
    return () => {
      chartInstance.dispose();
      window.removeEventListener('resize', resizeChart);
    };
  }, []);

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

export default SomeChartComponent;
