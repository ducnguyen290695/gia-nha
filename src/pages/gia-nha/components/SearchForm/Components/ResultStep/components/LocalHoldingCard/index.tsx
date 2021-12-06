import React, { useState } from "react";
import styles from "./index.module.scss";
import { Icon, FontAwesomeIcon } from "@/src/assets/icons";
import { hidePhoneNumber, getTimeFromNow } from "@/src/utils/helperFuncs";

import Img from "@/src/assets/images";
import Image from "next/image";

const LocalHoldingCard = (props) => {
  const { avatar, name, diamons, phone, price, createdAt } = props;
  const [showPhone, setShowPhone] = useState(false);

  function showPhoneNumber() {
    setShowPhone(true);
  }

  return (
    <div className={styles.item}>
      <div className={styles.info_col}>
        <div className={styles.avatar}>
          {avatar && <img src={avatar} alt='' />}
          {!avatar && <Image src={Img.AvatarPlaceHolder} />}
        </div>

        <div className={styles.info_detail}>
          <div className={styles.name_box}>
            <p className={styles.name}>{name || "Unknow"}</p>
            {/* <div className={styles.diamon_img}></div>
            <p className={styles.diamons}>{diamons}</p> */}
          </div>

          <div className={styles.phone}>
            <FontAwesomeIcon icon={Icon.faPhone} />
            <p className={styles.phone_number}>
              {showPhone
                ? phone || "Unknow"
                : hidePhoneNumber(phone) || "Unknow"}
            </p>
            {!showPhone && phone && (
              <p className={styles.show_more_btn} onClick={showPhoneNumber}>
                Hiện số
              </p>
            )}
          </div>
        </div>
      </div>

      <div className={styles.price_col}>
        <p className={styles.info_price}>
          {(price / 1000000).toFixed(1)} triệu/m²
        </p>
        <p className={styles.sale_time}>Bán {getTimeFromNow(createdAt)}</p>
      </div>
    </div>
  );
};

export default LocalHoldingCard;
