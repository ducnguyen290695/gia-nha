import React, { useState } from "react";
import styles from "./index.module.scss";

export default function TypeStep({ value, onChange }) {
  const options = [
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
  ];

  function onSelect(value) {
    onChange(value);
  }

  return (
    <div className={styles.type_step}>
      {options.map((item, index) => (
        <p
          style={{
            backgroundColor: value === item.value ? "rgb(228, 228, 228)" : "",
            color: value === item.value ? "#006aff" : "",
          }}
          onClick={() => onSelect(item.value)}
          key={index}
          className={styles.step_item}>
          {item.label}
        </p>
      ))}
    </div>
  );
}
