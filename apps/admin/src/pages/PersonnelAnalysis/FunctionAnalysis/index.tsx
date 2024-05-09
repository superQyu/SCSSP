import React, { useEffect, useState } from 'react';
import { Flex, Progress, Row, Col } from 'antd';
import { url } from 'inspector';
interface ListItem {
  label: string;
  number: number;
  per: number;
  tongbi: number;
  huanbi: number;
}

export default () => {
  const [list, setList] = useState<ListItem[]>([]);
  const queryData = () => {
    setList([
      {
        label: '木工',
        number: 5,
        per: 35.71,
        tongbi: 100,
        huanbi: 100,
      },
      {
        label: '建筑电工',
        number: 4,
        per: 35.71,
        tongbi: 100,
        huanbi: 100,
      },
      {
        label: '砌筑工',
        number: 3,
        per: 35.71,
        tongbi: 100,
        huanbi: 100,
      },
      {
        label: '架子工',
        number: 2,
        per: 15.71,
        tongbi: 100,
        huanbi: 100,
      },
    ]);
  };

  useEffect(() => {
    queryData();
  }, []);
  return (
    <Row gutter={20} className="h-full color-#458fff">
      {list.map((item: ListItem, index: number) => {
        return (
          <Col span={6} className="h-full">
            <Flex vertical justify="space-between" align="center" className="h-full">
              <div
                className="w-full h-25% text-center"
                style={{
                  background: `url(/src/assets/images/PA/no_0${
                    index + 1
                  }.png) no-repeat top 20px center`,
                  backgroundSize: '100% ',
                }}
              >
                NO.{index + 1}
              </div>
              <Progress type="circle" strokeWidth={8} size={80} percent={item.per} />
              <div>
                <span className="font-size-20px">{item.number}</span>
                <span className="color-#000">人</span>
              </div>
              <div>同比: {item.tongbi} %</div>
              <div>环比: {item.huanbi}%</div>
            </Flex>
          </Col>
        );
      })}
    </Row>
  );
};
