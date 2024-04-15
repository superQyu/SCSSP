import styled from 'styled-components';
import { type FormProps } from 'antd';
import { Space, Flex } from 'antd';
import { Card, Button } from 'antd';
import { Form, TimePicker, Input } from 'antd';
import { SearchOutlined, ReloadOutlined, UploadOutlined } from '@ant-design/icons';

type FieldType = {
  sample?: string;
  witness?: string;
  type?: string;
  startTime?: string;
  endTime?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values);
};

export default () => {
  return (
    <div>
      <Card>
        <Form name="basic" onFinish={onFinish}>
          <Flex justify="space-between">
            <Space>
              <FormItem label="分包单位" name="sample">
                <Input />
              </FormItem>
              <FormItem label="劳务工作" name="witness">
                <Input />
              </FormItem>
              <FormItem label="人员姓名" name="type">
                <Input />
              </FormItem>
              <FormItem label="身份证号" name="type">
                <TimePicker.RangePicker />
              </FormItem>
            </Space>
            <FormItem>
              <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
                搜索
              </Button>
              <Button
                className="ml-4 bg-#E5E5E5 resetButton"
                htmlType="reset"
                icon={<ReloadOutlined />}
              >
                重置
              </Button>
            </FormItem>
          </Flex>
        </Form>
      </Card>
      <Card>
        <ExportButton type="primary" className="bg-#FFA153" icon={<UploadOutlined />}>
          导出
        </ExportButton>
      </Card>
    </div>
  );
};

const FormItem = styled(Form.Item)`
  margin: 0px;
  input {
    width: 7rem;
  }
  .resetButton:hover {
    background: #e5e5e5 !important;
  }
`;

const ExportButton = styled(Button)`
  &&:hover {
    background: #ffa153 !important;
  }
`;
