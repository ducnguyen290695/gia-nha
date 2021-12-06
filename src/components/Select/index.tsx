import React, { useState } from "react";
import styles from "./index.module.scss";
import { Icon, FontAwesomeIcon } from "@/src/assets/icons";

const Select = ({ onChange, value, options, label, onClick, hideDropDown }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  function onSelect(value) {
    onChange(value);
  }

  function getLabelByValue(value) {
    return options?.find((item) => item.value === value)?.label;
  }

  function closeDropdown() {
    setShowDropdown(false);
  }

  function togleDropdown() {
    setShowDropdown(!showDropdown);
    onClick && onClick();
  }

  if (typeof window !== "undefined") {
    window.onclick = (e) => {
      console.log(e.target.id);
      if (e.target.id !== "Select_mask__1-JVi") {
        closeDropdown();
      }
    };
  }

  return (
    <div className={styles.select} onClick={togleDropdown}>
      <div id={styles.mask}></div>
      <p className={styles.label} id={!value ? styles.label : ""}>
        {label}
      </p>
      {value && <p className={styles.value}>{getLabelByValue(value)}</p>}
      <div className={styles.arrow}>
        <FontAwesomeIcon icon={Icon.faChevronDown} />
      </div>

      {hideDropDown || (
        <div
          className={styles.drop_down}
          style={{
            visibility: showDropdown ? "visible" : "hidden",
            opacity: showDropdown ? 1 : 0,
            transform: showDropdown ? "translateY(0px)" : "translateY(-10px)",
          }}>
          {options?.map((item, index) => (
            <div
              key={index}
              onClick={() => onSelect(item.value)}
              style={{
                backgroundColor:
                  value === item.value ? "rgb(197, 197, 197)" : "",
                color: value === item.value ? "white" : "",
              }}
              className={styles.option}>
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
