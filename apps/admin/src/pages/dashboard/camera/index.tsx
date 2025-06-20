import { useState } from 'react';
import { Card, Flex } from 'antd';

import Left from './Left';
import Right from './Right';

export default () => {
  const [code, setCode] = useState<number>();
  return (
    <>
      <Flex className="h-full" gap={10}>
        <div className="flex-1 w-0 h-full">
          <Right code={code} />
        </div>
        <div className="w-170px bg-#F1F7FF h-full p-10px overflow-y-auto">
          <Left onSelect={(id: number) => setCode(id)} />
        </div>
      </Flex>
    </>
  );
};
