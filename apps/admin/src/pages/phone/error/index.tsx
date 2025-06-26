import { Empty } from 'antd-mobile';

import { ExclamationCircleOutline } from 'antd-mobile-icons';

export default () => {
  return (
    <>
      <Empty
        image={
          <ExclamationCircleOutline
            style={{
              color: 'var(--adm-color-light)',
              fontSize: 48,
            }}
          />
        }
        description="对不起，您没有权限"
      />
    </>
  );
};
