import { useState } from 'react';
import { Card, Flex } from 'antd';
import styled from 'styled-components';
import SingleTitle from '@/components/SingleTitle';

import Left from './Left';
import Right from './Right';
const CustomSDiv = styled.div`
  padding: 20px 17px;
  height: 100%;
  background: #eaf0f6;
`;
const CustomCard = styled(Card)(() => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  background: '#FFFFFF',
  boxShadow: '0px 4px 13px 0px rgba(0,0,0,0.07)',
  borderRadius: '10px',
  border: '1px solid #EEEEEE',
  '.ant-card-head': {
    borderBottom: 'none',
  },
  '.ant-card-body': {
    flex: 1,
    height: 0,
    padding: '10px 20px',
    overflowY: 'hidden',
  },
}));

export default () => {
  const [code, setCode] = useState<number>();
  return (
    <>
      <CustomSDiv>
        <CustomCard title={<SingleTitle label="视频列表" />}>
          <Flex className="h-full" gap={10}>
            <div className="w-270px bg-#F1F7FF p-10px">
              <Left onSelect={(id: number) => setCode(id)} />
            </div>

            <div className="flex-1 w-0 h-full">
              <Right code={code} />
            </div>
          </Flex>
        </CustomCard>
      </CustomSDiv>
    </>
  );
};
