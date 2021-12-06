import React from "react";
import styles from "./index.module.scss";
import { Input, Form, Button } from "antd";
import { REGEX } from "@/src/config/constants";

const PhoneStep = ({ onComplete }) => {
  return (
    <div className={styles.phone_step}>
      <Form
        labelCol={{ span: 0 }}
        wrapperCol={{ span: 24 }}
        onFinish={(values) => onComplete(values)}>
        <Form.Item
          name='phone'
          rules={[
            { required: true, message: "Vui lòng nhập số điện thoại !" },
            () => ({
              validator(_, value) {
                if (REGEX.PHONE.test(value)) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Số điện thoại không đúng định dạng !")
                );
              },
            }),
          ]}>
          <Input maxLength={11} placeholder='Nhập số điện thoại' />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
          <Button htmlType='submit' type='primary'>
            Tra cứu
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PhoneStep;
