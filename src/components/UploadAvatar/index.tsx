import React, { useState } from "react";
import { Upload, message, notification } from "antd";
import { LoadingOutlined, UploadOutlined } from "@ant-design/icons";
import { getBase64 } from "@/src/utils/helperFuncs";
import styles from "./index.module.scss";

const UploadAvatar = ({ onChange, types, maxSize, imgUrl }) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(imgUrl);

  const uploadButton = (
    <div className={styles.upload_btn}>
      {loading ? <LoadingOutlined /> : <UploadOutlined />}
    </div>
  );

  const beforeUpload = (file) => {
    const correctFormart = types.includes(file.type);
    if (!types.includes(file.type)) {
      notification.error({
        message: `Chỉ chấp nhận định dạng ${types.map((item) => ` ${item}`)} !`,
        duration: 5,
      });
    }
    const isLt2M = file.size / 1024 / 1024 < maxSize;
    if (!isLt2M) {
      notification.error({
        message: `Dung lượng file không được vượt quá ${maxSize}MB !`,
        duration: 5,
      });
    }
    return correctFormart && isLt2M;
  };

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (imgUrl) => {
        if (!beforeUpload(info.file)) {
          return;
        }
        setLoading(false);
        setImageUrl(imgUrl);
        onChange(imgUrl, info.file);
      });
    }
  };

  const dummyRequest = (file, onSuccess) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  return (
    <Upload
      customRequest={({ file, onSuccess }) => dummyRequest(file, onSuccess)}
      name='avatar'
      className={styles.upload}
      showUploadList={false}
      beforeUpload={beforeUpload}
      onChange={handleChange}>
      {imageUrl ? (
        <img src={imageUrl} alt='avatar' className={styles.avatar_img} />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};

export default UploadAvatar;
