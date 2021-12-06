import React, { Fragment, useState, useEffect } from "react";
import styles from "./index.module.scss";
import UploadAvatar from "@/src/components/UploadAvatar";
import { Form, Input, Button } from "antd";
import Api from "@/src/utils/api";
import { API_URL, REGEX } from "@/src/config/constants";
import { notify } from "@/src/utils/helperFuncs";

const RegisterForm = ({ onRegisterSuccess, userInfo }) => {
  const [avatar, setAvatar] = useState();
  const [loading, setLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [form] = Form.useForm();

  // function resetForm() {
  //   form.resetFields();
  //   setAvatar(null);
  // }

  async function register(values) {
    const { name, phone } = values;
    var bodyFormData = new FormData();
    avatar && bodyFormData.append("avatar", avatar);
    name && bodyFormData.append("name", name);
    phone && bodyFormData.append("phone", phone);
    setLoading(true);
    try {
      const res = await Api.postUpload({
        url: API_URL.REGISTER,
        payload: bodyFormData,
      });
      console.log({ res });
      setLoading(false);
      notify.success({
        message: userInfo ? "Cập nhật thành công !" : "Đăng ký thành công !",
      });
      localStorage.setItem("userInfo", JSON.stringify(res?.data?.data));
      onRegisterSuccess();
      // resetForm();
    } catch (err) {
      setLoading(false);
      notify.error({
        message: userInfo ? "Cập nhật thất bại !" : "Đăng ký thất bại !",
      });
    }
  }

  function initForm() {
    userInfo &&
      form.setFieldsValue({
        ...userInfo,
      });
    return;
  }

  useEffect(() => {
    initForm();
  }, []);

  return (
    <Fragment>
      <div className={styles.form_container}>
        <div className={styles.form}>
          <p className={styles.title}>
            {userInfo ? "Hồ sơ" : "Tạo hồ sơ chuyên gia"}
          </p>
          <UploadAvatar
            imgUrl={userInfo ? userInfo?.avatar : ""}
            onChange={(imgUrl, file) => {
              setAvatar(file?.originFileObj);
            }}
            types={["image/jpeg", "image/jpg", "image/png"]}
            maxSize={2}
          />
          <p className={styles.avatar_description}>Hình đại diện</p>
          <Form form={form} onFinish={(values) => register(values)}>
            <Form.Item
              name='name'
              rules={[{ required: true, message: "Vui lòng nhập tên !" }]}>
              <Input placeholder='Nhập họ và tên' />
            </Form.Item>

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
              <Input placeholder='Nhập số điện thoại' />
            </Form.Item>

            <Form.Item>
              <Button type='primary' htmlType='submit' loading={loading}>
                {userInfo ? "Cập nhật" : "Đăng ký"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Fragment>
  );
};

export default RegisterForm;
