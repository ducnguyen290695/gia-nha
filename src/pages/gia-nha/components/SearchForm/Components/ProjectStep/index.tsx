import React from "react";
import styles from "./index.module.scss";
import { Input, Form, Button, Select } from "antd";

const ProjectStep = ({ value, onComplete, data }) => {
  console.log({ data });
  return (
    <div className={styles.project_step}>
      <Form
        labelCol={{ span: 0 }}
        wrapperCol={{ span: 24 }}
        onFinish={(values) => onComplete(values)}>
        <Form.Item
          name='projectName'
          rules={[{ required: true, message: "Vui lòng chọn dự án !" }]}>
          <Select
            style={{
              width: "300px",
            }}
            placeholder='Chọn dự án'
            options={data?.map((item) => ({
              label: item?.label,
              value: item?.value,
            }))}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
          <Button htmlType='submit' type='primary'>
            Tiếp tục
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProjectStep;
