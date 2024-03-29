import React from 'react';
import ErrorPage from '@/pages/error-page';
import { Button, Result } from 'antd';

const Dashboard: React.FC = () => {
  return (
    <ErrorPage>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          // <Link to={'/'}></Link>
          <Button type="primary">Back Home</Button>
        }
      />
    </ErrorPage>
  );
};
export default Dashboard;
