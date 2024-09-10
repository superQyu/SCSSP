import {
  useState,
  lazy,
  Suspense,
  useRef,
  useEffect,
} from 'react';
import { Card } from 'antd';

export default () => {
  useEffect(() => {
    getDetail();
  }, []);

  /** 获得详情 */
  const getDetail = () => {
    // 1. 获得流程实例相关
    getProcessInstance();
    // 2. 获得流程任务列表（审批记录）
    getTaskList();
  };

  const getProcessInstance = async () => {
    try {
      processInstanceLoading.value = true;
      const data = await ProcessInstanceApi.getProcessInstance(
        id
      );
      if (!data) {
        message.error('查询不到流程信息！');
        return;
      }
      processInstance.value = data;

      // 设置表单信息
      const processDefinition = data.processDefinition;
      if (processDefinition.formType === 10) {
        setConfAndFields2(
          detailForm,
          processDefinition.formConf,
          processDefinition.formFields,
          data.formVariables
        );
        nextTick().then(() => {
          fApi.value?.fapi?.btn.show(false);
          fApi.value?.fapi?.resetBtn.show(false);
          fApi.value?.fapi?.disabled(true);
        });
      } else {
        BusinessFormComponent.value = registerComponent(
          data.processDefinition.formCustomViewPath
        );
      }

      // 加载流程图
      bpmnXML.value =
        await DefinitionApi.getProcessDefinitionBpmnXML(
          processDefinition.id as number
        );
    } finally {
      processInstanceLoading.value = false;
    }
  };

  return (
    <div className="h-full pl-20px pr-100px overflow-y-auto overflow-x-hidden bg-#fff">
      {/* 审批信息 */}
      {runningTasks.map((item: any) => (
        <Card></Card>
      ))}
    </div>
  );
};
