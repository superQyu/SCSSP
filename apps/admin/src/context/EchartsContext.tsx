import React, { createContext, useContext } from 'react';

import { TOKEN } from 'utils';
import { autoInterface } from '@spms/web-request';
import apisGather from '@/apis';
import * as baseConf from '@/config';
import { NET_STATUS } from '@/config/NetStatus';

interface ConfigurationType {
  server: Record<string, any>;
  config?: Record<string, any>;
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
  return (
    <BasicConfigurationContext.Provider
      value={
        {
          server: autoInterface(apisGather, TOKEN, { requested: NET_STATUS }),
          config: baseConf,
        } as ConfigurationType
      }
    >
      {children}
    </BasicConfigurationContext.Provider>
  );
};
