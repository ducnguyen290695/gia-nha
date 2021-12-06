import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";
import { Icon, FontAwesomeIcon } from "@/src/assets/icons";
import {
  hidePhoneNumber,
  convertCurrentcy,
  getTimeFromNow,
} from "@/src/utils/helperFuncs";
import { Button, Form, Input, Radio, InputNumber } from "antd";
import LocalHoldingCard from "../SearchForm/Components/ResultStep/components/LocalHoldingCard";
import { Line } from "react-chartjs-2";
import ImageSlide from "./ImageSlide";
import Img from "@/src/assets/images";
import Image from "next/image";
import moment from "moment";
import { API_URL, REGEX } from "@/src/config/constants";
import { useDispatch, useSelector } from "react-redux";
import Api from "@/src/utils/api";
import { notify } from "@/src/utils/helperFuncs";

const DetailForm = ({ postId, userInfo }) => {
  const [showPhone, setShowPhone] = useState(false);
  const [seeMoreLocalHolding, setSeeMoreLocalHolding] = useState(false);
  const [requestLoading, setRequestLoading] = useState(false);
  const [showPriceForm, setShowPriceForm] = useState(false);
  const post = useSelector((state: any) => state?.post?.getDetail?.data?.data);
  const localHolding = useSelector(
    (state: any) => state?.localHolding?.get?.data?.data
  );
  const project = post?.project;

  const dispatch = useDispatch();

  const data = {
    labels: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"],
    datasets: [
      {
        label: "Giá thị trường",
        data: [0, 120, 140, 160, 20, 30, 10, 50, 70, 40, 50, 30, 10],
        fill: false,
        backgroundColor: "#006AFF",
        borderColor: "#006AFF",
      },
      {
        label: "Giá tin rao",
        data: [0, 100, 130, 160, 20, 10, 40, 60, 50, 70, 10, 0, 30],
        fill: false,
        backgroundColor: "#FFA68C",
        borderColor: "#FFA68C",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

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

  function showPhoneNumber() {
    setShowPhone(true);
    console.log(moment(project?.createdAt).format("DD/MM/YYYY"));
  }

  function togle() {
    setSeeMoreLocalHolding(!seeMoreLocalHolding);
  }

  async function submitQuestion(values) {
    setRequestLoading(true);
    try {
      await Api.post({
        url: `${API_URL.POST}/${postId}/request-support`,
        payload: {
          ...values,
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

  async function submitPriceForm(values) {
    console.log({ values });
    setRequestLoading(true);
    try {
      await Api.post({
        url: `${API_URL.POST}/${postId}/price`,
        payload: {
          ...values,
          price: parseInt(values.price),
          phone: userInfo?.phone,
        },
      });
      notify.success({
        message: "Gửi thành công !",
      });
      setRequestLoading(false);
    } catch (err) {
      notify.error({
        message: "Gửi thất bại !",
      });
      setRequestLoading(false);
    }
  }

  function getPostDetail() {
    dispatch({
      type: "GET_POST_DETAIL_REQUEST",
      payload: {
        id: postId,
      },
    });
  }

  function getLocalHolding() {
    dispatch({
      type: "GET_LOCAL_HOLDING_REQUEST",
      payload: {
        id: postId,
      },
    });
  }

  function handleShowPriceForm() {
    console.log({ userInfo });
    if (!userInfo) {
      notify.warning({
        message: "Vui lòng đăng ký !",
      });
      return;
    }
    setShowPriceForm(true);
  }

  useEffect(() => {
    getLocalHolding();
    getPostDetail();
  }, [postId]);

  return (
    <div className={styles.container}>
      <div className={styles.left_col}>
        <div className={styles.image_slide_mobile}>
          <ImageSlide imgUrls={post?.assets?.slice(0, 9)} />
        </div>

        <div className={styles.images_slide}>
          {post?.assets?.slice(0, 9)?.map((item, index) => (
            <div key={index} className={styles.img_item}>
              {item.length > 0 && <img src={item} alt='' />}
              {/* {item.length > 0 || <Image src={Img.ImagePlaceHolder} />} */}
            </div>
          ))}
        </div>

        <div className={styles.post_info}>
          <div className={styles.admin_info}>
            <div className={styles.avatar}>
              {post?.authorAvatar && (
                <img
                  src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhKSJLZfQT1tRJzHGqSmJ9x3s0SxO0jPtVIg&usqp=CAU'
                  alt=''
                />
              )}

              {!post?.authorAvatar && <Image src={Img.AvatarPlaceHolder} />}
            </div>

            <div className={styles.name_box}>
              <p className={styles.name}>{post?.authorName}</p>
              {/* <div className={styles.diamon_img}></div>
              <p className={styles.diamons}>120</p> */}
            </div>

            <div className={styles.phone_number}>
              <FontAwesomeIcon icon={Icon.faPhone} />
              <p className={styles.phone}>
                {showPhone
                  ? post?.authorPhone
                  : hidePhoneNumber(post?.authorPhone)}
              </p>
              {showPhone || (
                <p className={styles.show_more_btn} onClick={showPhoneNumber}>
                  Hiện số
                </p>
              )}
            </div>
          </div>

          <p className={styles.post_time}>
            Đăng ngày: {moment(project?.createdAt).format("DD/MM/YYYY")}
          </p>

          <p className={styles.title}>{post?.title}</p>

          <p className={styles.content}>
            {/* Căn hộ Duplex 132m2 dự án Feliz En Vista. Tháp Altaz cao cấp nhất dự
            án có sảnh chờ riêng biệt, hồ bơi và phòng gym riêng biệt. <br />
            Tổng DT: 132m2 có 3PN, có 2 ban công ở phòng khách và phòng ngủ
            Master.
            <br /> Tầng 26 view đẹp thoáng mát.
            <br /> Giá bán 18 tỷ. Full nội thất, HĐ thuê 30tr/th. */}
            {post?.description}
          </p>

          <p className={styles.source}>Nguồn: {post?.sourceName}</p>
        </div>
      </div>
      <div className={styles.right_col}>
        <p className={styles.title}>Giá Căn hộ Feliz En Vista 2 pn 100 m²</p>
        <p className={styles.description}>
          Dự án {project?.name}, {post?.street}, {post?.ward}, {post?.district},{" "}
          {post?.city}
        </p>

        <div className={styles.price_group}>
          <div className={styles.left_col}>
            <p className={styles.price_label}>Giá tin rao</p>
            <p className={styles.price}>{convertCurrentcy(post?.price)}</p>
            <p className={styles.rate}>
              ~{(post?.price / (post?.lotSize * 1000000)).toFixed(1)} triệu/m²
            </p>
          </div>

          <div className={styles.center_col}></div>

          <div className={styles.right_col}>
            <p className={styles.price_label}>Giá thị trường</p>
            <p className={styles.price}>
              {convertCurrentcy(post?.marketPrice)}
            </p>
            <p className={styles.rate}>
              ~{(post?.marketPrice / (post?.lotSize * 1000000)).toFixed(1)}{" "}
              triệu/m²
            </p>
          </div>
        </div>

        <div className={styles.project_info}>
          <div className={styles.left_col}>
            <p className={styles.info_item}>
              Diện tích: <span>{post?.lotSize} m²</span>
            </p>
            <p className={styles.info_item}>
              Số phòng ngủ: <span> {post?.bedrooms} phòng</span>
            </p>
            <p className={styles.info_item}>
              Số phòng vệ sinh: <span>{post?.bathrooms} phòng</span>
            </p>
            <p className={styles.info_item}>
              Nội thất: <span>{post?.furniture}</span>
            </p>
            <p className={styles.info_item}>
              Pháp lý: <span>{post?.legal}</span>
            </p>
          </div>

          <div className={styles.right_col}>
            <p className={styles.info_item}>
              Hướng nhà: <span>{post?.houseView}</span>
            </p>
            <p className={styles.info_item}>
              Hướng ban công: <span>{post?.windowView}</span>
            </p>
            <p className={styles.info_item}>
              View: <span> Landmark</span>
            </p>
            {/* <p className={styles.info_item}>
              Số phòng vệ sinh: <span>1 phòng</span>
            </p> */}
            <p className={styles.info_item}>
              Loại hình: <span>{post?.propertyType}</span>
            </p>
          </div>
        </div>

        <div className={styles.opinion}>
          {showPriceForm || (
            <React.Fragment>
              <p className={styles.your_opinion} onClick={handleShowPriceForm}>
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
                  loading={requestLoading}
                  className={styles.submit_btn}
                  htmlType='submit'
                  type='primary'>
                  Gửi
                </Button>
              </Form.Item>
            </Form>
          )}
        </div>

        <div className={styles.local_holding}>
          <p className={styles.label}>Chuyên gia địa phương</p>

          <div className={styles.local_holding_list}>
            {localHolding
              ?.slice(0, seeMoreLocalHolding ? 10 : 2)
              ?.map((item, index) => (
                <LocalHoldingCard key={index} {...item} />
              ))}
          </div>

          <div className={styles.see_more} onClick={togle}>
            <FontAwesomeIcon
              icon={seeMoreLocalHolding ? Icon.faChevronUp : Icon.faChevronDown}
            />
            <p>{seeMoreLocalHolding ? "Ẩn bớt" : "Xem thêm"}</p>
          </div>

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

          <div className={styles.project_info}>
            <div className={styles.left_col}>
              <p className={styles.info_item}>
                Tên dự án: <span>{project?.name}</span>
              </p>
              <p className={styles.info_item}>
                Chủ đầu tư: <span>{project?.investor}</span>
              </p>
              <p className={styles.info_item}>
                Quy mô: <span>{project?.scale}</span>
              </p>
              <p className={styles.info_item}>
                Thời điểm hoàn thành:{" "}
                <span>
                  {moment(project?.CompletionTime).format("DD/MM/YYYY")}
                </span>
              </p>
            </div>

            <div className={styles.right_col}>
              <p className={styles.info_item}>
                Diện tích: <span>{project?.area} m²</span>
              </p>
              <p className={styles.info_item}>
                Diện tích xây dựng: <span>{project?.constructionArea} m²</span>
              </p>
              <p className={styles.info_item}>
                Mật độ xây dựng: <span> {project?.constructionDensity} %</span>
              </p>
              <p className={styles.info_item}>
                Số căn hộ: <span>{project?.apartmentCount} căn</span>
              </p>
              <p className={styles.info_item}>
                Số tòa: <span> {project?.buildingCount} tòa</span>
              </p>
            </div>
          </div>

          <div className={styles.chart_section}>
            <Line data={data} options={options} />
          </div>

          <div className={styles.bottom_section}>
            <div className={styles.left_col}>
              {project?.utilities?.slice(0, 8)?.map((item, index) => (
                <p key={index} className={styles.bottom_item}>
                  {item}
                </p>
              ))}
            </div>

            <div className={styles.right_col}>
              {project?.utilities?.slice(8, 30)?.map((item, index) => (
                <p key={index} className={styles.bottom_item}>
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailForm;
