import { useState } from 'react';

import { ProCard } from '@ant-design/pro-components';
import Left from './Left';
import Right from './Right';

export default () => {
  const [code, setCode] = useState();

  return (
    <ProCard split="vertical" className="h-full">
      <ProCard colSpan="400px" ghost className="h-full">
        <Left onChange={(thirdLevelCode: any) => setCode(thirdLevelCode)} />
      </ProCard>
      <ProCard className="h-full" colSpan="calc(100% - 400px)" bordered>
        <Right code={code} />
      </ProCard>
    </ProCard>
  );
};
