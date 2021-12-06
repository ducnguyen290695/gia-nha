import React from "react";
import styles from "./index.module.scss";
import { Icon, FontAwesomeIcon } from "@/src/assets/icons";

const Modal = ({ children, visible, setVisible }) => {
  function closeModal() {
    setVisible(false);
  }

  function onClickMaskLayer(e) {
    if (e.target.matches(".Modal_mask_layer__3MN8C")) {
      closeModal();
    }
  }

  return (
    <div
      onClick={onClickMaskLayer}
      className={styles.mask_layer}
      style={{
        visibility: visible ? "visible" : "hidden",
        opacity: visible ? 1 : 0,
      }}>
      <div
        className={styles.modal_content}
        style={{
          transform: visible ? "scale(1)" : "scale(0)",
        }}>
        <div className={styles.close_btn} onClick={closeModal}>
          <FontAwesomeIcon icon={Icon.faTimes} />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
