import React, { useState } from "react";
import styles from "./index.module.scss";
import { Line } from "react-chartjs-2";
import { Icon, FontAwesomeIcon } from "@/src/assets/icons";
import LocalHoldingCard from "./components/LocalHoldingCard";
import { Button, Form, Input, Radio } from "antd";
import { API_URL, REGEX } from "@/src/config/constants";
import { notify } from "@/src/utils/helperFuncs";
import Api from "@/src/utils/api";

const ResultStep = ({ post, userInfo, categoryPath }) => {
  const [seeMoreLocalHolding, setSeeMoreLocalHolding] = useState(false);
  const [requestLoading, setRequestLoading] = useState(false);
  const [priceLoading, setPriceLoading] = useState(false);

  const [showPriceForm, setShowPriceForm] = useState(false);

  const localHoldingData = [
    {
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhKSJLZfQT1tRJzHGqSmJ9x3s0SxO0jPtVIg&usqp=CAU",
      name: "Mai hương",
      phone: "0935799853",
      diamons: 120,
      price: 577,
      days: 5,
    },
    {
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhKSJLZfQT1tRJzHGqSmJ9x3s0SxO0jPtVIg&usqp=CAU",
      name: "Mai hương",
      phone: "0935799853",
      diamons: 120,
      price: 577,
      days: 5,
    },
    {
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhKSJLZfQT1tRJzHGqSmJ9x3s0SxO0jPtVIg&usqp=CAU",
      name: "Mai hương",
      phone: "0935799853",
      diamons: 120,
      price: 577,
      days: 5,
    },
    {
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhKSJLZfQT1tRJzHGqSmJ9x3s0SxO0jPtVIg&usqp=CAU",
      name: "Mai hương",
      phone: "0935799853",
      diamons: 120,
      price: 577,
      days: 5,
    },
    {
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhKSJLZfQT1tRJzHGqSmJ9x3s0SxO0jPtVIg&usqp=CAU",
      name: "Mai hương",
      phone: "0935799853",
      diamons: 120,
      price: 577,
      days: 5,
    },
    {
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhKSJLZfQT1tRJzHGqSmJ9x3s0SxO0jPtVIg&usqp=CAU",
      name: "Mai hương",
      phone: "0935799853",
      diamons: 120,
      price: 577,
      days: 5,
    },
    {
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhKSJLZfQT1tRJzHGqSmJ9x3s0SxO0jPtVIg&usqp=CAU",
      name: "Mai hương",
      phone: "0935799853",
      diamons: 120,
      price: 577,
      days: 5,
    },
    {
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhKSJLZfQT1tRJzHGqSmJ9x3s0SxO0jPtVIg&usqp=CAU",
      name: "Mai hương",
      phone: "0935799853",
      diamons: 120,
      price: 577,
      days: 5,
    },
  ];

  const data = {
    labels: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"],
    datasets: [
      // {
      //   label: "Giá thị trường",
      //   data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 50, 30, 10],
      //   fill: false,
      //   backgroundColor: "#006AFF",
      //   borderColor: "#006AFF",
      // },
      // {
      //   label: "Giá tin rao",
      //   data: [0, 100, 130, 160, 20, 10, 40, 60, 50, 70, 10, 0, 30],
      //   fill: false,
      //   backgroundColor: "#FFA68C",
      //   borderColor: "#FFA68C",
      // },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  function togle() {
    setSeeMoreLocalHolding(!seeMoreLocalHolding);
  }

  async function submitQuestion(values) {
    setRequestLoading(true);
    try {
      await Api.post({
        url: `${API_URL.CATEGORIES}/request-support`,
        payload: {
          ...values,
          categoryPath,
        },
      });
      setRequestLoading(false);
      notify.success({
        message: "Gửi yêu cầu thành công !",
      });
    } catch (err) {
      setRequestLoading(false);
      notify.error({
        message: "Gửi yêu cầu thất bại !",
      });
    }
  }

  function handleShowPriceForm() {
    if (!userInfo) {
      notify.warning({
        message: "Vui lòng đăng ký !",
      });
      return;
    }
    setShowPriceForm(true);
  }

  async function submitPriceForm(values) {
    setPriceLoading(true);
    try {
      await Api.post({
        url: `${API_URL.CATEGORIES}/price`,
        payload: {
          ...values,
          categoryPath,
          price: parseInt(values.price),
          phone: userInfo?.phone,
        },
      });
      notify.success({
        message: "Gửi thành công !",
      });
      setPriceLoading(false);
    } catch (err) {
      notify.error({
        message: "Gửi thất bại !",
      });
      setPriceLoading(false);
    }
  }

  return (
    <div className={styles.result_step}>
      <div className={styles.left_col}>
        <p className={styles.chart_title}>Lịch sử giá khu vực</p>
        <div className={styles.chart}>
          <Line data={data} options={options} />
        </div>
      </div>

      <div className={styles.right_col}>
        <p className={styles.title}>
          Giá {post?.propertyType} {post?.project} {post?.lotSize} m²
        </p>
        <p className={styles.description}>
          Dự án {post?.project}, {post?.ward}, {post?.district}, {post?.city}
        </p>
        <p className={styles.price_label}>Giá thị trường</p>
        <p className={styles.price}>{post?.marketPrice} tỷ</p>
        <p className={styles.rate}>
          ~{post?.marketPrice / post?.lotSize} triệu/m²
        </p>
        <div className={styles.info}>
          <p className={styles.info_item}>
            Diện tích: <span>{post?.lotSize} m²</span>
          </p>

          <p className={styles.info_item}>
            Số phòng ngủ: <span>{post?.bedrooms} phòng</span>
          </p>
        </div>

        <div className={styles.local_holding}>
          {post?.specialists && (
            <React.Fragment>
              <p className={styles.label}>Chuyên gia địa phương</p>

              <div className={styles.local_holding_list}>
                {post?.specialists
                  ?.slice(0, seeMoreLocalHolding ? 8 : 2)
                  ?.map((item, index) => (
                    <LocalHoldingCard key={index} {...item} />
                  ))}
              </div>
            </React.Fragment>
          )}

          {post?.specialists?.length > 2 && (
            <div className={styles.see_more} onClick={togle}>
              <FontAwesomeIcon
                icon={
                  seeMoreLocalHolding ? Icon.faChevronUp : Icon.faChevronDown
                }
              />
              <p>{seeMoreLocalHolding ? "Ẩn bớt" : "Xem thêm"}</p>
            </div>
          )}

          <Form onFinish={(values) => submitQuestion(values)}>
            <Form.Item
              rules={[{ required: true, message: "Vui lòng nhập câu hỏi !" }]}
              name='note'>
              <Input.TextArea placeholder='Nhập câu hỏi, lời nhắn...' />
            </Form.Item>

            <Form.Item
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
              ]}
              // initialValue={JSON.parse(localStorage.getItem("userInfo"))?.phone}
              name='phone'>
              <Input placeholder='Nhập số điện thoại' />
            </Form.Item>

            <Form.Item
              // initialValue={JSON.parse(localStorage.getItem("userInfo"))?.name}
              rules={[{ required: true, message: "Vui lòng nhập tên !" }]}
              name='name'>
              <Input placeholder='Nhập họ tên' />
            </Form.Item>

            <Form.Item>
              <Button
                loading={requestLoading}
                className={styles.submit_btn}
                htmlType='submit'
                type='primary'>
                Yêu cầu tư vấn
              </Button>
            </Form.Item>
          </Form>

          <div className={styles.opinion}>
            {/* <p className={styles.your_opinion}>Theo bạn giá đang bao nhiêu?</p>
            <p className={styles.share}>
              Chia sẻ để tham gia cộng đồng chuyên gia địa phương
            </p> */}

            {showPriceForm || (
              <React.Fragment>
                <p
                  className={styles.your_opinion}
                  onClick={handleShowPriceForm}>
                  Theo bạn giá đang bao nhiêu?
                </p>
                <p className={styles.share}>
                  Chia sẻ để tham gia cộng đồng chuyên gia địa phương
                </p>
              </React.Fragment>
            )}

            {showPriceForm && (
              <Form onFinish={(values) => submitPriceForm(values)}>
                <Form.Item
                  rules={[
                    { required: true, message: "Vui lòng nhập giá !" },
                    () => ({
                      validator(_, value) {
                        if (REGEX.NUMBER.test(value)) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error("Vui lòng nhập số !"));
                      },
                    }),
                  ]}
                  name='price'>
                  <Input placeholder='Nhập giá' />
                </Form.Item>

                <p className={styles.share}>
                  Chia sẻ để tham gia cộng đồng chuyên gia địa phương
                </p>

                <Form.Item name='isAdvertisement' initialValue={true}>
                  <Radio.Group>
                    <Radio value={false}>Giá đã bán gần đây</Radio>
                    <Radio value={true}>Giá đang rao</Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item>
                  <Button
                    loading={priceLoading}
                    className={styles.submit_btn}
                    htmlType='submit'
                    type='primary'>
                    Gửi
                  </Button>
                </Form.Item>
              </Form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultStep;
