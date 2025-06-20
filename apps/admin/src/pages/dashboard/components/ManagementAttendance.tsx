import { useEffect, useRef, useState } from 'react';
import { Spin } from 'antd';
import { useECharts } from '@/context/EChartContext';
import { useBasicConfiguration } from '@/context/BasicConfigurationContext';
const SomeChartComponent = () => {
  const { server } = useBasicConfiguration();
  const { attendance } = server;
  const { getEChartsInstance } = useECharts();
  const chartRef = useRef(null);
  const [spinning, setSpinning] = useState(true);
  const [chartData, setChartData] = useState<number[]>([]);
  const [xAxis, setXAxis] = useState<string[]>([]);

  let chartInstance: any = null;

  const queryData = async () => {
    const res =
      await attendance.getSafetyManagerAttendanceCount();
    const obj: any = {};
    res.forEach((item: any) => {
      if (obj.hasOwnProperty(item.name)) {
        obj[item.name] += item.todayAttendanceCount;
      } else {
        obj[item.name] = item.todayAttendanceCount;
      }
    });
    setChartData(
      Object.values(obj).map((item: any) => item.toFixed(2))
    );
    setXAxis(Object.keys(obj));
  };

  const setOptions = () => {
    const option = {
      color: ['#1A64F8'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'none',
        },
        formatter: function (prams) {
          return prams[0].name + ':' + prams[0].data;
        },
      },
      grid: {
        left: '8%',
        right: '8%',
        top: '5%',
        bottom: '30%',
      },
      xAxis: [
        {
          type: 'category',
          data: xAxis,
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: '#606266',
            interval: 0,
            margin: 10,
            // rotate: -25,
          },
          axisLine: {
            show: false,
          },
        },
      ],
      yAxis: {
        name: `(单位: h)`,
        nameGap: 20,
        nameTextStyle: {
          color: '#454545',
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: '#454545',
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'line',
          },
        },
      },
      dataZoom: [
        {
          type: 'slider',
          xAxisIndex: 0,
          bottom: 10,
          start: 0,
          end: 30, // 初始显示50%的数据
          height: 10, // 减小滚动条高度
          backgroundColor: 'rgba(108, 122, 249, 1)', // 滚动条背景色
          fillerColor: 'rgba(108, 122, 249, 0.8)', // 滚动条填充色，与柱体颜色匹配
          borderColor: 'transparent',
          handleIcon:
            'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
          handleSize: '100%',
          textStyle: {
            color: '#666',
          },
        },
        {
          type: 'inside',
          xAxisIndex: 0,
          start: 0,
          end: 30, // 与上面的slider保持一致
          zoomOnMouseWheel: false, // 关闭鼠标滚轮缩放
          moveOnMouseMove: true, // 鼠标移动时触发滚动
          moveOnMouseWheel: true, // 鼠标滚轮触发滚动
        },
      ],
      series: [
        {
          name: '考勤分析',
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: '#dee4f0',
            borderRadius: 7,
          },
          itemStyle: {
            color: '#6c7af9',
            borderRadius: 7,
          },
          barWidth: 14,
          label: {
            show: true,
            color: '#454545',
            position: 'outside',
          },
          data: chartData,
        },
      ],
    };
    chartInstance.setOption(option);
  };

  const resizeChart = () => chartInstance.resize();

  useEffect(() => {
    queryData();
  }, []);

  useEffect(() => {
    chartInstance = getEChartsInstance(chartRef);
    setOptions();
    resizeChart();
    setSpinning(false);
  }, [chartData]);

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
