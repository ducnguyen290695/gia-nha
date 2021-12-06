import React, { useEffect, useRef, Fragment, useState } from "react";
import { Table, Form, Space, Button, Divider, Row, Col } from "antd";
// import FormInput from "../FormInput";
// import { SEARCH_FORM_LAYOUT, FORM_LAYOUT } from "@/src/config/constants";
import styles from "./index.module.css";

const RestContent = (props) => {
  const {
    dataSource,
    columns,
    onTableChange,
    searchFields,
    onSearch,
    actions,
    tableLoading,
    pagination,
    components,
  } = props;

  const [form] = Form.useForm();

  return (
    <Fragment>
      {/* {searchFields && (
        <div className={styles.searchBox}>
          <div className={styles.fieldsBox}>
            <Form {...FORM_LAYOUT} form={form}>
              <Row>
                {searchFields.map((item, index) => {
                  return (
                    <Col
                      sm={{ span: 24 }}
                      md={{ span: 12 }}
                      lg={{ span: 12 }}
                      xl={{ span: 12 }}>
                      <div className={styles.searchItem}>
                        <FormInput key={index} {...item} />
                      </div>
                    </Col>
                  );
                })}
              </Row>

              <div className={styles.btnGroup}>
                <Form.Item wrapperCol={{ span: 16, offset: 4 }}>
                  <Space>
                    <Button type='primary' htmlType='submit'>
                      Search
                    </Button>
                    <Button>Clear</Button>
                  </Space>
                </Form.Item>
              </div>
            </Form>
          </div>
        </div>
      )} */}

      {actions && (
        <div className={styles.actionSection}>
          {actions.leftPart && (
            <Fragment>
              <Space style={{ marginBottom: "15px" }}>
                {actions.leftPart.map((action, index) => {
                  return <Fragment key={index}>{action}</Fragment>;
                })}
              </Space>
            </Fragment>
          )}
          {actions.rightPart && (
            <Fragment>
              <Space style={{ marginBottom: "15px" }}>
                {actions.rightPart.map((action, index) => {
                  return <Fragment key={index}>{action}</Fragment>;
                })}
              </Space>
            </Fragment>
          )}
        </div>
      )}

      <Table
        rowKey={"id"}
        loading={tableLoading}
        dataSource={dataSource}
        columns={columns}
        bordered
        components={components}
        pagination={pagination}
        size={"small"}
        onChange={onTableChange}
      />
    </Fragment>
  );
};

export default RestContent;
