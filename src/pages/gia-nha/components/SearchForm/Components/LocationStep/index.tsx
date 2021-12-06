import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";
import { Icon, FontAwesomeIcon } from "@/src/assets/icons";

const LocationStep = ({ onChange, value, data, searchBox }) => {
  const [dataFiltered, setDataFiltered] = useState(data);

  function filter(value) {
    let filteredItems = data?.filter((item) =>
      item.label.toUpperCase().includes(value.toUpperCase())
    );
    setDataFiltered(filteredItems);
  }

  console.log({ data });

  useEffect(() => {
    setDataFiltered(data);
  }, [data]);

  return (
    <div className={styles.container}>
      {searchBox && (
        <div className={styles.search_box}>
          <input
            placeholder='Tỉnh / Thành phố'
            onChange={(e) => filter(e.target.value)}
          />
          <FontAwesomeIcon icon={Icon.faSearch} />
        </div>
      )}

      <div className={styles.data_list}>
        {dataFiltered?.map((item, index) => (
          <p
            style={{
              backgroundColor: value === item.value ? "rgb(228, 228, 228)" : "",
              color: value === item.value ? "#006aff" : "",
            }}
            key={index}
            className={styles.item}
            onClick={() => onChange(item.value)}>
            {item.label}
          </p>
        ))}
      </div>
    </div>
  );
};

export default LocationStep;
