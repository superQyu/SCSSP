import React, { useState, createContext, useContext } from 'react';

import { TOKEN, getToken } from 'utils';
import { autoInterface } from '@spms/web-request';
import apisGather from '@/apis';
import * as baseConf from '@/config';
import { NET_STATUS } from '@/config/NetStatus';
import { Spin } from 'antd';

interface ConfigurationType {
  server: Record<string, any>;
  config?: Record<string, any>;
  setFullLoding: React.Dispatch<React.SetStateAction<boolean>>;
}

interface BasicConfigurationContextType extends ConfigurationType {
  // eslint-disable-next-line no-unused-vars
}

const BasicConfigurationContext = createContext<BasicConfigurationContextType | undefined>(
  undefined
);

export const useBasicConfiguration = () => {
  const context = useContext(BasicConfigurationContext);
  if (!context) {
    throw new Error('useBasicConfiguration must be used within a BasicConfigurationProvider');
  }
  return context;
};

export const BasicConfigurationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loding, setFullLoding] = useState(false);
  const { PROJECTNAME: DP } = baseConf || {};

  const parameter = {
    projectId: () => getToken(DP),
  };

  return (
    <BasicConfigurationContext.Provider
      value={
        {
          server: autoInterface(apisGather, TOKEN, {
            additionalParam: parameter,
            requested: NET_STATUS,
          }),
          config: baseConf,
          setFullLoding,
        } as ConfigurationType
      }
    >
      <Spin
        tip={'加载中，请稍等...'}
        size={'large'}
        spinning={loding}
        wrapperClassName="full-spining"
      >
        {children}
      </Spin>
    </BasicConfigurationContext.Provider>
  );
};
