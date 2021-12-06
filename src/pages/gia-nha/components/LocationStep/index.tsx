import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";
import { Icon, FontAwesomeIcon } from "@/src/assets/icons";
import { useSelector, useDispatch } from "react-redux";
import { generateActions } from "@/src/utils/reduxGenerator";

const LocationList = ({ onChange, type, locationList }) => {
  return (
    <div className={styles.location_list}>
      {locationList?.map((item, index) => (
        <div
          key={index}
          onClick={() => onChange(item.id, type)}
          className={styles.location_item}>
          <p>{item.name}</p>
          <FontAwesomeIcon icon={Icon.faChevronRight} />
        </div>
      ))}
    </div>
  );
};

const LocationStep = ({ onChange }) => {
  const [step, setStep] = useState(1);
  const { GET: GET_CITIES } = generateActions("cities");
  const { GET: GET_DISTRICTS } = generateActions("districts");
  const { GET: GET_WARDS } = generateActions("wards");

  const [cityId, setCityId] = useState();
  const { cities, districts, wards } = useSelector(
    (state: any) => state?.location
  );
  const dispatch = useDispatch();

  function getCities() {
    dispatch({
      type: GET_CITIES.GET_REQUEST,
    });
  }

  function getDistricts(cityId) {
    setCityId(cityId);
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

  function handleChange(value, type) {
    onChange(value, type, step);
    setStep(step + 1);
    if (step === 3) {
      setStep(1);
    }
  }

  useEffect(() => {
    getCities();
  }, []);
  return (
    <div className={styles.container}>
      {step === 1 && (
        <LocationList
          locationList={cities?.data?.data}
          type='city'
          onChange={(cityId, type) => {
            handleChange(cityId, type);
            getDistricts(cityId);
          }}
        />
      )}

      {step === 2 && (
        <LocationList
          locationList={districts?.data?.data}
          type='district'
          onChange={(districtId, type) => {
            handleChange(districtId, type);
            getWards(districtId, cityId);
          }}
        />
      )}

      {step === 3 && (
        <LocationList
          locationList={wards?.data?.data}
          type='ward'
          onChange={(wardId, type) => {
            handleChange(wardId, type);
          }}
        />
      )}
    </div>
  );
};

export default LocationStep;
