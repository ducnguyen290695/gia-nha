import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";
import { Icon, FontAwesomeIcon } from "@/src/assets/icons";
import Select from "@/src/components/Select";
import { Table, Button, Drawer } from "antd";
import { MODAL_TYPE, API_URL } from "@/src/config/constants";
import Image from "next/image";
import Img from "@/src/assets/images";
import Modal from "@/src/components/Modal";
import RegisterForm from "./components/RegisterForm";
import SearchForm from "./components/SearchForm";
import DetailForm from "./components/DetailForm";
import { useSelector, useDispatch } from "react-redux";
import { generateActions } from "@/src/utils/reduxGenerator";
import {
  convertCurrentcy,
  getRateChange,
  getTimeFromNow,
  getRange,
  notify,
  buildQueryString,
  getQueryParams,
} from "@/src/utils/helperFuncs";
import LocationStep from "./components/LocationStep";
import Api from "@/src/utils/api";
import ghostApi from "@/src/utils/ghostApi";

const Board = () => {
  const [showModal, setShowModal] = useState(false);
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [modalType, setModalType] = useState("");
  const [showLoadMore, setShowLoadMore] = useState(true);
  const [showDrawer, setShowDrawer] = useState(false);
  const pageSize = 10;
  const [params, setParams] = useState({
    limit: pageSize,
    offset: 0,
  });
  const [posts, setPosts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [drawerTitle, setDrawerTitle] = useState("Tỉnh / Thành phố");
  const [userInfo, setUserInfo] = useState(null);
  const [postId, setPostId] = useState("");

  const tableLoading = useSelector((state: any) => state?.post?.get?.loading);
  const { wards } = useSelector((state: any) => state?.location);

  const { GET: GET_POST } = generateActions("post");
  const { GET: GET_WARDS } = generateActions("wards");

  const dispatch = useDispatch();

  const [filterValues, setFilterValues] = useState({
    property_type: null,
    city: null,
    district: null,
    ward: null,
    project_name: null,
    price: null,
    min_price: null,
    max_price: null,
    area: null,
    min_area: null,
    max_area: null,
    bed_rooms: null,
    bath_rooms: null,
    house_view: null,
    furniture: null,
    legal: null,
    price_ads: null,
    author: null,
  });

  const filters = [
    {
      label: "Loại BĐS",
      value: filterValues.property_type,
      options: [
        {
          value: "Căn hộ",
          label: "Căn hộ chung cư",
        },
        {
          value: "Nhà riêng",
          label: "Nhà ở",
        },
        {
          value: "Shophouse",
          label: "Shophouse",
        },
        {
          value: "Penthouse",
          label: "Penthouse",
        },
        {
          value: "Officetel",
          label: "Officetel",
        },
        {
          value: "Codontel",
          label: "Codontel",
        },
        {
          value: "Nhà biệt thự, liền kề",
          label: "Biệt thự",
        },
        {
          value: "Đất nền dự án",
          label: "Đất",
        },
        {
          value: "Kho / nhà xưởng",
          label: "Kho / nhà xưởng",
        },
      ],
      onClick: null,
      hideDropDown: false,
      onChange: (value) =>
        setFilterValues({
          ...filterValues,
          property_type: value,
        }),
    },
    {
      label: "Khu vực",
      value: filterValues.ward,
      options: wards?.data?.data?.map((item) => ({
        label: item.name,
        value: item.id,
      })),
      hideDropDown: true,
      onClick: () => {
        setShowDrawer(true);
        setDrawerTitle("Tỉnh / Thành Phố");
        setProjects([]);
        setFilterValues({
          ...filterValues,
          project_name: null,
        });
      },
      onChange: (value) => console.log(value),
    },
    {
      label: "Dự án",
      value: filterValues.project_name,
      options: projects,
      onClick: getProjects,
      hideDropDown: false,
      onChange: (value) =>
        setFilterValues({
          ...filterValues,
          project_name: value,
        }),
    },
    {
      label: "Mức giá",
      value: filterValues.price,
      options: [
        {
          label: "0 - 500 triệu",
          value: "0-500",
        },
        {
          label: "500 triệu - 800 triệu",
          value: "500-800",
        },
        {
          label: "800 triệu - 1 tỷ",
          value: "800-1000",
        },
        {
          label: "1 tỷ - 2 tỷ",
          value: "1000-2000",
        },
        {
          label: "2 - 3 tỷ",
          value: "2000-3000",
        },
        {
          label: "3 - 5 tỷ",
          value: "3000-5000",
        },
        {
          label: "5 - 7 tỷ",
          value: "5000-7000",
        },
        {
          label: "7 - 10 tỷ",
          value: "7000-10000",
        },
        {
          label: "10 - 15 tỷ",
          value: "10000-15000",
        },
        {
          label: "15 - 20 tỷ",
          value: "15000-20000",
        },
        {
          label: "Trên 20 tỷ",
          value: "20000-",
        },
      ],
      hideDropDown: false,
      onClick: null,
      onChange: (value) =>
        setFilterValues({
          ...filterValues,
          price: value,
          min_price: getRange(value).min * 1000000,
          max_price: getRange(value).max * 1000000 || null,
        }),
    },
    {
      label: "Diện tích",
      value: filterValues.area,
      options: [
        {
          label: "0 - 30 m²",
          value: "0-30",
        },
        {
          label: "30 - 50 m²",
          value: "30-50",
        },
        {
          label: "50 - 80 m²",
          value: "50-80",
        },
        {
          label: "80 - 100 m²",
          value: "80-100",
        },
        {
          label: "100 - 150 m²",
          value: "100-150",
        },
        {
          label: "150 - 300 m²",
          value: "150-300",
        },

        {
          label: "300 - 500 m²",
          value: "300-500",
        },
        {
          label: "500 m²",
          value: "30-",
        },
      ],
      hideDropDown: false,
      onClick: null,
      onChange: (value) =>
        setFilterValues({
          ...filterValues,
          area: value,
          min_area: getRange(value).min,
          max_area: getRange(value).max,
        }),
    },
    {
      label: "Phòng ngủ",
      value: filterValues.bed_rooms,
      options: [
        {
          label: "0",
          value: "0",
        },
        {
          label: "1",
          value: "1",
        },
        {
          label: "2",
          value: "2",
        },
        {
          label: "3",
          value: "3",
        },
        {
          label: "4",
          value: "4",
        },
      ],
      hideDropDown: false,
      onClick: null,
      onChange: (value) =>
        setFilterValues({
          ...filterValues,
          bed_rooms: value,
        }),
    },
    {
      label: "Phòng tắm",
      value: filterValues.bath_rooms,
      options: [
        {
          label: "0",
          value: "0",
        },
        {
          label: "1",
          value: "1",
        },
        {
          label: "2",
          value: "2",
        },
        {
          label: "3",
          value: "3",
        },
        {
          label: "4",
          value: "4",
        },
      ],
      hideDropDown: false,
      onClick: null,
      onChange: (value) =>
        setFilterValues({
          ...filterValues,
          bath_rooms: value,
        }),
    },
    {
      label: "Hướng nhà",
      value: filterValues.house_view,
      options: [
        {
          label: "Đông",
          value: "Đông",
        },
        {
          label: "Tây",
          value: "Tây",
        },
        {
          label: "Nam",
          value: "Nam",
        },
        {
          label: "Bắc",
          value: "Bắc",
        },
        {
          label: "Đông Nam",
          value: "Đông Nam",
        },
        {
          label: "Tây Nam",
          value: "Tây Nam",
        },
        {
          label: "Đông Bắc",
          value: "Đông Bắc",
        },
        {
          label: "Tây Bắc",
          value: "Tây Bắc",
        },
      ],
      hideDropDown: false,
      onClick: null,
      onChange: (value) =>
        setFilterValues({
          ...filterValues,
          house_view: value,
        }),
    },
    {
      label: "Nội thất",
      value: filterValues.furniture,
      options: [
        {
          label: "Cao cấp",
          value: "Cao cấp",
        },
        {
          label: "Đầy đủ",
          value: "Đầy đủ",
        },
        {
          label: "Cơ bản",
          value: "Cơ bản",
        },
        {
          label: "Bàn giao thô",
          value: "Bàn giao thô",
        },
      ],
      hideDropDown: false,
      onClick: null,
      onChange: (value) =>
        setFilterValues({
          ...filterValues,
          furniture: value,
        }),
    },
    {
      label: "Pháp lý",
      value: filterValues.legal,
      options: [
        {
          label: "Đã có sổ",
          value: "Đã có sổ",
        },
        {
          label: "Đang chờ sổ",
          value: "Đang chờ sổ",
        },
        {
          label: "Giấy tờ khác",
          value: "Giấy tờ khác",
        },
      ],
      hideDropDown: false,
      onClick: null,
      onChange: (value) =>
        setFilterValues({
          ...filterValues,
          legal: value,
        }),
    },
    {
      label: "Đăng bởi",
      value: filterValues.author,
      options: [
        {
          label: "Môi giới",
          value: "Môi giới",
        },
        {
          label: "Cá nhân",
          value: "Cá nhân",
        },
      ],
      hideDropDown: false,
      onClick: null,
      onChange: (value) =>
        setFilterValues({
          ...filterValues,
          author: value,
        }),
    },
  ];

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Loại BĐS",
      dataIndex: "propertyType",
      key: "propertyType",
    },
    {
      title: "Khu vực",
      dataIndex: "ward",
      key: "ward",
    },
    {
      title: "Dự án",
      dataIndex: "projectName",
      key: "projectName",
      render: (_, record) => (
        <a href={null} onClick={() => openPostDetail(record)}>
          {record.projectName}
        </a>
      ),
    },
    {
      title: "Diện tích ",
      dataIndex: "lotSize",
      key: "lotSize",
      sorter: (a, b) => a.area - b.area,
      render: (_, record) => `${record.lotSize} m2`,
    },
    {
      title: "Phòng ngủ",
      dataIndex: "bedrooms",
      key: "bedrooms",
      width: 70,
    },
    {
      title: "Hướng nhà",
      dataIndex: "houseView",
      key: "houseView",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (_, record) => {
        return (
          <span className={styles.price_label}>
            {record.price > 0 ? convertCurrentcy(record.price) : ""}
          </span>
        );
      },
    },
    {
      title: "Tin rao",
      dataIndex: "price_ads",
      key: "price_ads",
      render: (_, record) => {
        return `${(record.price / (record.lotSize * 1000000)).toFixed(
          2
        )} tr/m²`;
      },
    },
    {
      title: "Thị trường",
      dataIndex: "marketPrice",
      key: "marketPrice",
      render: (_, record) => {
        return record.marketPrice > 0 ? `${record.marketPrice}  tr/m²` : "";
      },
    },
    {
      title: "Biến động",
      dataIndex: "volatility",
      key: "volatility",
      render: (_, record) => (
        <div
          className={
            getRateChange(record.price, record.marketPrice) >= 0
              ? styles.rate_up
              : styles.rate_down
          }>
          <FontAwesomeIcon
            icon={
              getRateChange(record.price, record.marketPrice) >= 0
                ? Icon.faSortUp
                : Icon.faSortDown
            }
          />
          {Math.abs(getRateChange(record.price, record.marketPrice))} %
        </div>
      ),
    },
    {
      title: "Chuyên gia",
      dataIndex: "specialListCount",
      key: "specialListCount",
      width: 70,
    },
    {
      title: "Thời gian",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_, record) => {
        return getTimeFromNow(record.createdAt);
      },
    },
  ];

  function openPostDetail(record) {
    openModal({ type: MODAL_TYPE.DETAIL });
    setPostId(record.id);
  }

  function openModal({ type }) {
    setModalType(type);
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  function openFilterDrawer() {
    setShowFilterDrawer(true);
  }

  function closeFilterDrawer() {
    setShowFilterDrawer(false);
  }

  function getPost() {
    dispatch({
      type: GET_POST.GET_REQUEST,
      payload: params,
      onSuccess: (res) => {
        console.log(res?.data?.data?.posts?.length % 10);
        setPosts([...posts, ...res?.data?.data?.posts]);
        if (
          res?.data?.data?.posts?.length % pageSize !== 0 ||
          res?.data?.data?.posts?.length === 0
        ) {
          setShowLoadMore(false);
          return;
        }
        setShowLoadMore(true);
      },
    });
  }

  function getWards(districId, cityId) {
    dispatch({
      type: GET_WARDS.GET_REQUEST,
      payload: {
        district_id: districId,
        city_id: cityId,
      },
    });
  }

  function loadMoreData() {
    setParams({
      ...params,
      offset: params.offset + pageSize,
    });
  }

  function setQueryString(filterValues) {
    let queryParams = {};
    for (let [key, value] of Object.entries(filterValues)) {
      if (value) {
        queryParams[`${key}`] = value;
      }
    }
    buildQueryString({
      rootUrl: window.location.origin + window.location.pathname,
      params: {
        ...queryParams,
      },
    });
  }

  function handleFilter(filterValues) {
    setPosts([]);
    setParams({
      limit: pageSize,
      offset: 0,
      ...filterValues,
    });
    setQueryString(filterValues);
  }

  function closeDrawer() {
    setShowDrawer(false);
  }

  async function getProjects() {
    const { city, ward, district } = filterValues;
    if (!ward) {
      notify.warning({
        message: "Vui lòng chọn khu vực !",
      });
      return;
    }
    try {
      const res = await Api.get({
        url: API_URL.PROJECTS,
        params: {
          city,
          ward,
          district,
        },
      });
      if (!res?.data?.data?.length) {
        notify.warning({
          message: "Không có dự án nào tại khu vực này !",
        });
        return;
      }
      setProjects(
        res?.data?.data?.map((item) => ({
          label: item.name,
          value: item.name,
        })) || []
      );
    } catch (err) {
      console.log({ err });
    }
  }

  function handleLocationChange(value, type, step) {
    console.log({ value }, { type }, { step });
    setFilterValues({
      ...filterValues,
      [`${type}`]: value,
    });

    if (step === 1) {
      setDrawerTitle("Quận / Huyện");
    }

    if (step === 2) {
      setDrawerTitle("Phường / Xã");
    }

    if (step === 3) {
      closeDrawer();
    }
    return;
  }

  function getUserInfo() {
    let userInfoJson = localStorage.getItem("userInfo");
    let userInfoObj = JSON.parse(userInfoJson);
    console.log({ userInfoObj });
    userInfoObj &&
      setUserInfo({
        ...userInfoObj,
      });
  }

  function handleRegisterSuccess() {
    closeModal();
    getUserInfo();
  }

  useEffect(() => {
    getPost();
  }, [params]);

  useEffect(() => {
    const { district, city } = getQueryParams();
    getWards(district, city);
    handleFilter(getQueryParams());
    setFilterValues(getQueryParams());
    getUserInfo();
  }, []);

  async function getPosts() {
    const posts = await ghostApi.posts
      .browse({
        limit: "all",
      })
      .catch((err) => {
        console.error(err);
      });

    console.log({ posts });
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className={styles.container}>
      <Modal visible={showModal} setVisible={setShowModal}>
        {modalType === MODAL_TYPE.REGISTER && (
          <RegisterForm
            userInfo={userInfo}
            onRegisterSuccess={handleRegisterSuccess}
          />
        )}
        {modalType === MODAL_TYPE.SEARCH && <SearchForm userInfo={userInfo} />}
        {modalType === MODAL_TYPE.DETAIL && (
          <DetailForm postId={postId} userInfo={userInfo} />
        )}
      </Modal>

      <Drawer
        className={styles.location_drawer}
        bodyStyle={{
          padding: "0px",
        }}
        title={drawerTitle}
        onClose={closeDrawer}
        placement='right'
        visible={showDrawer}>
        <LocationStep
          onChange={(value, type, step) =>
            handleLocationChange(value, type, step)
          }
        />
      </Drawer>

      <div
        className={styles.mobile_drawer}
        style={{
          left: showFilterDrawer ? "0px" : "-100%",
        }}>
        <div className={styles.search_box}>
          <input type='text' placeholder='Nhập địa chỉ' />
          <FontAwesomeIcon icon={Icon.faSearch} />
        </div>

        <div className={styles.filters}>
          {filters?.map((item, index) => {
            return <Select key={index} {...item} />;
          })}
        </div>

        <div className={styles.btn_group}>
          <div className={styles.back_btn} onClick={closeFilterDrawer}>
            <FontAwesomeIcon icon={Icon.faArrowLeft} />
          </div>
          <Button type='primary'>Tìm kiếm</Button>
        </div>
      </div>

      <div className={styles.header}>
        <div className={styles.menu_mobile}>
          <FontAwesomeIcon icon={Icon.faBars} />
        </div>
        <div className={styles.logo}></div>
        {!userInfo && (
          <div
            className={styles.register_btn}
            onClick={() => openModal({ type: MODAL_TYPE.REGISTER })}>
            Đăng ký
          </div>
        )}
        {userInfo && (
          <div className={styles.userInfo}>
            <div
              className={styles.avatar}
              onClick={() => openModal({ type: MODAL_TYPE.REGISTER })}>
              {userInfo?.avatar && <img src={userInfo.avatar} alt='avatar' />}
              {!userInfo?.avatar && <Image src={Img.AvatarPlaceHolder} />}
            </div>

            <div className={styles.info}>
              <p className={styles.name}>{userInfo.name}</p>
              <p className={styles.phone}>{userInfo.phone}</p>
            </div>
          </div>
        )}
      </div>

      <div className={styles.titile_section}>
        <p className={styles.title}>
          Ước tính giá nhà của bạn <br /> đang bao nhiêu?
        </p>

        <Button
          type='primary'
          onClick={() => openModal({ type: MODAL_TYPE.SEARCH })}>
          Ước tính giá
        </Button>
      </div>

      <p className={styles.table_title}>Bảng giá toàn quốc</p>

      <div className={styles.filter_box}>
        <div className={styles.filters}>
          {filters?.map((item, index) => {
            return <Select key={index} {...item} />;
          })}
        </div>

        <div className={styles.right_col}>
          <div className={styles.more_filter} onClick={openFilterDrawer}>
            Lọc thêm <FontAwesomeIcon icon={Icon.faFilter} />
          </div>
          <Button type='primary' onClick={() => handleFilter(filterValues)}>
            Tìm kiếm <FontAwesomeIcon icon={Icon.faArrowRight} />
          </Button>
        </div>
      </div>

      <div className={styles.table}>
        <div className={styles.table_common}>
          <Table
            columns={columns}
            pagination={false}
            sticky={{
              offsetHeader: 0,
            }}
            dataSource={posts?.map((item, index) => ({
              ...item,
              no: index + 1,
            }))}
            size='small'
          />
        </div>

        <div className={styles.table_mobile}>
          <Table
            columns={columns}
            pagination={false}
            dataSource={posts?.map((item, index) => ({
              ...item,
              no: index + 1,
            }))}
            size='small'
          />
        </div>

        {showLoadMore && (
          <div className={styles.load_more}>
            <Button
              type='primary'
              onClick={loadMoreData}
              loading={tableLoading === null ? false : tableLoading}
              icon={
                <FontAwesomeIcon
                  className={styles.load_more_icon}
                  icon={Icon.faArrowAltCircleDown}
                />
              }>
              Xem thêm
            </Button>
          </div>
        )}
      </div>

      <div className={styles.local_holding}>
        <div className={styles.left_col}>
          <div className={styles.image}>
            <Image src={Img.LocalHoding} alt='' />
          </div>
        </div>

        <div className={styles.right_col}>
          <p className={styles.local_title}>
            Trở thành chuyên gia <br /> địa phương
          </p>
          <p className={styles.description}>
            Chia sẻ sự am hiểu thông tin về thị trường của bạn để kết nối với{" "}
            <br /> khách hàng mục tiêu, truy suất dữ liệu báo cáo
          </p>

          <Button type='primary'>Đăng ký tham gia</Button>
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.content}>
          <div className={styles.logo}>
            <Image src={Img.Logo} />
          </div>

          <div className={styles.bottom_col}>
            <p className={styles.bottom_title}>Products</p>
            <a className={styles.bottom_item} href=''>
              Định giá
            </a>
            <a className={styles.bottom_item} href=''>
              Quản lý danh mục đầu tư
            </a>
            <a className={styles.bottom_item} href=''>
              Chuyên gia địa phương
            </a>
            <a className={styles.bottom_item} href=''>
              CMA Phân tích so sánh thị trường
            </a>
            <a className={styles.bottom_item} href=''>
              Phân tích thị trường
            </a>
          </div>

          <div className={styles.bottom_col}>
            <p className={styles.bottom_title}>Company</p>
            <a className={styles.bottom_item} href=''>
              Giới thiệu
            </a>
            <a className={styles.bottom_item} href=''>
              Điều khoản sử dụng
            </a>
            <a className={styles.bottom_item} href=''>
              Chính sách bảo mật
            </a>
            <a className={styles.bottom_item} href=''>
              Tuyên bố từ chối trách nhiệm
            </a>
            <a className={styles.bottom_item} href=''>
              Tuyển Dụng
            </a>
          </div>

          <div className={styles.bottom_col}>
            <p className={styles.bottom_title}>Support</p>
            <a className={styles.bottom_item} href=''>
              Yêu cầu hỗ trợ
            </a>
            <a className={styles.bottom_item} href=''>
              Liên hệ
            </a>
            <a className={styles.bottom_item} href=''>
              FAQ
            </a>
            <a className={styles.bottom_item} href=''>
              CMA Phân tích so sánh thị trường
            </a>
            <a className={styles.bottom_item} href=''>
              Phương pháp luận
            </a>
          </div>

          <div className={styles.bottom_col}>
            <p className={styles.bottom_title}>Socials</p>
            <a className={styles.bottom_item} href=''>
              Facebook
            </a>
            <a className={styles.bottom_item} href=''>
              Twitter
            </a>
            <a className={styles.bottom_item} href=''>
              Telegram
            </a>
            <a className={styles.bottom_item} href=''>
              Instagram
            </a>
          </div>
        </div>

        <div className={styles.license}>
          <p className={styles.label}>© 2021 Gianha. All rights reserved</p>

          <div className={styles.apps}>
            <div className={styles.app_store}></div>
            <div className={styles.gg_play}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
