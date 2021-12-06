import React, { useState } from "react";
import styles from "./index.module.scss";
import { Input, Form, InputNumber, Button } from "antd";
import { REGEX } from "@/src/config/constants";

const DetailInfo = ({ onComplete, type }) => {
  return (
    <div className={styles.detail_info}>
      <Form
        layout='vertical'
        onFinish={(values) => onComplete(values)}
        labelAlign='left'>
        <Form.Item
          rules={[
            { required: true, message: "Vui lòng nhập diện tích !" },
            () => ({
              validator(_, value) {
                if (REGEX.NUMBER.test(value)) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Vui lòng nhập số !"));
              },
            }),
          ]}
          label='Diện tích'
          name='area'>
          <Input placeholder='Nhập diện tích' addonAfter='Mét vuông' />
        </Form.Item>

        {["Nhà riêng", "Nhà biệt thự, liền kề", "Căn hộ chung cư"].includes(
          type
        ) && (
          <Form.Item
            rules={[{ required: true, message: "Vui lòng nhập số phòng !" }]}
            label='Phòng ngủ'
            name='bedrooms'>
            <InputNumber placeholder='Số phòng ngủ' min={1} max={10} />
          </Form.Item>
        )}

        {["Nhà riêng", "Nhà biệt thự, liền kề"].includes(type) && (
          <Form.Item
            rules={[{ required: true, message: "Vui lòng nhập số tầng !" }]}
            label='Số tầng'
            name='floors'>
            <InputNumber placeholder='Số tầng' min={1} max={100} />
          </Form.Item>
        )}

        <Form.Item>
          <Button htmlType='submit' type='primary'>
            Tiếp tục
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default DetailInfo;
