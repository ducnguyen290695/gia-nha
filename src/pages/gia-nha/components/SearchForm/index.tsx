import React, { Fragment, useState, useEffect } from "react";
import styles from "./index.module.scss";
import TypeStep from "./Components/TypeStep";
import ProjectStep from "./Components/ProjectStep";
import DetailInfo from "./Components/DetailInfo";
import PhoneStep from "./Components/PhoneStep";
import ResultStep from "./Components/ResultStep";
import { Progress } from "antd";
import LocationStep from "./Components/LocationStep";
import { generateActions } from "@/src/utils/reduxGenerator";
import { useSelector, useDispatch } from "react-redux";
import { notify } from "@/src/utils/helperFuncs";
import { API_URL } from "@/src/config/constants";
import Api from "@/src/utils/api";

const SearchForm = ({ userInfo }) => {
  const [step, setStep] = useState(1);
  const [projects, setProjects] = useState([]);
  const [postResult, setPostResult] = useState<any>();

  const { GET: GET_CITIES } = generateActions("cities");
  const { GET: GET_DISTRICTS } = generateActions("districts");
  const { GET: GET_WARDS } = generateActions("wards");
  const dispatch = useDispatch();

  const cities = useSelector(
    (state: any) => state?.location?.cities?.data?.data
  );

  const districts = useSelector(
    (state: any) => state?.location?.districts?.data?.data
  );

  const wards = useSelector((state: any) => state?.location?.wards?.data?.data);

  const [formValues, setFormValues] = useState({
    property_type: "",
    project_name: "",
    lot_size: 0,
    bed_rooms: 1,
    floor: 0,
    phone: "",
    city: "",
    district: "",
    ward: "",
  });

  function getCities() {
    dispatch({
      type: GET_CITIES.GET_REQUEST,
    });
  }

  function getDistricts(cityId) {
    dispatch({
      type: GET_DISTRICTS.GET_REQUEST,
      payload: {
        city_id: cityId,
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

  async function getProjects({ province, ward, district }) {
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
          province,
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

  async function getPostResult(phone_number) {
    try {
      const res = await Api.get({
        url: API_URL.CATEGORIES,
        params: {
          ...formValues,
          phone_number,
        },
      });
      console.log({ res });
      setPostResult(res?.data?.data);
    } catch (err) {}
  }

  function nextStep() {
    setStep(step + 1);
  }

  function getTileByStep() {
    if (step === 1) {
      return "Chọn loại hình bất động sản";
    }
    if (step === 2) {
      return "Chọn tỉnh / thành phố";
    }
    if (step === 3) {
      return "Chọn Quận / Huyện";
    }
    if (step === 4) {
      return "Chọn Phường / Xã";
    }
    if (step === 5) {
      return "Chọn dự án";
    }
    if (step === 6) {
      return "Thông tin chi tiết";
    }
    if (step === 7) {
      return "Nhập số điện thoại";
    }

    return "";
  }

  useEffect(() => {
    getCities();
  }, []);

  return (
    <div
      className={styles.search_form}
      onClick={() => console.log({ formValues })}>
      {step !== 8 && (
        <Fragment>
          <div className={styles.progress}>
            <Progress
              strokeLinecap='square'
              showInfo={false}
              percent={15 * step}
              strokeColor='#0062FF'
              strokeWidth={12}
            />
          </div>
          <div className={styles.form}>
            <p className={styles.title}>{getTileByStep()}</p>
            <div className={styles.form_content}>
              {step === 1 && (
                <TypeStep
                  value={formValues.property_type}
                  onChange={(value) => {
                    nextStep();
                    setFormValues({
                      ...formValues,
                      property_type: value,
                    });
                  }}
                />
              )}

              {step === 2 && (
                <LocationStep
                  searchBox
                  data={cities?.map((item) => ({
                    label: item.name,
                    value: item.id,
                  }))}
                  onChange={(value) => {
                    nextStep();
                    setFormValues({
                      ...formValues,
                      city: value,
                    });
                    getDistricts(value);
                  }}
                  value={formValues.city}
                />
              )}

              {step === 3 && (
                <LocationStep
                  searchBox={false}
                  data={
                    districts?.map((item) => ({
                      value: item.id,
                      label: item.name,
                    })) || []
                  }
                  onChange={(value) => {
                    nextStep();
                    setFormValues({
                      ...formValues,
                      district: value,
                    });
                    getWards(value, formValues.city);
                  }}
                  value={formValues.district}
                />
              )}

              {step === 4 && (
                <LocationStep
                  searchBox={false}
                  data={wards?.map((item) => ({
                    label: item.name,
                    value: item.id,
                  }))}
                  onChange={(value) => {
                    nextStep();
                    setFormValues({
                      ...formValues,
                      ward: value,
                    });
                    getProjects({
                      province: formValues.city,
                      district: formValues.district,
                      ward: value,
                    });
                  }}
                  value={formValues.ward}
                />
              )}

              {step === 5 && (
                <ProjectStep
                  data={projects}
                  value={formValues.project_name}
                  onComplete={({ projectName }) => {
                    nextStep();
                    setFormValues({
                      ...formValues,
                      project_name: projectName,
                    });
                  }}
                />
              )}

              {step === 6 && (
                <DetailInfo
                  type={formValues.property_type}
                  onComplete={({ area, bedrooms, floors }) => {
                    nextStep();
                    setFormValues({
                      ...formValues,
                      lot_size: parseInt(area),
                      bed_rooms: bedrooms,
                      floor: floors,
                    });
                  }}
                />
              )}

              {step === 7 && (
                <PhoneStep
                  onComplete={({ phone }) => {
                    nextStep();
                    setFormValues({
                      ...formValues,
                      phone: phone,
                    });
                    getPostResult(phone);
                  }}
                />
              )}
            </div>
          </div>
        </Fragment>
      )}

      {step === 8 && (
        <ResultStep
          userInfo={userInfo}
          post={postResult}
          categoryPath={postResult?.categoryPath}
        />
      )}
    </div>
  );
};

export default SearchForm;
