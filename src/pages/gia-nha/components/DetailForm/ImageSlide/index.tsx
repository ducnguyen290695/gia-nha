import React, { useRef } from "react";
import styles from "./index.module.scss";
import Slider from "react-slick";
import { Icon, FontAwesomeIcon } from "@/src/assets/icons";

const ImageSlide = ({ imgUrls }) => {
  const slider: any = useRef();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: styles.slider,
    ref: slider,
    arrows: false,
  };

  function nextSlide() {
    slider.current.slickNext();
  }

  function prevSlide() {
    slider.current.slickPrev();
  }

  return (
    <div className={styles.image_slide}>
      <Slider {...settings}>
        {imgUrls?.map((item, index) => (
          <div key={index} className={styles.slide_item}>
            <img src={item} alt='' />
          </div>
        ))}
      </Slider>

      <div className={styles.prev_btn}>
        <FontAwesomeIcon icon={Icon.faChevronLeft} onClick={prevSlide} />
      </div>

      <div className={styles.next_btn}>
        <FontAwesomeIcon icon={Icon.faChevronRight} onClick={nextSlide} />
      </div>
    </div>
  );
};

export default ImageSlide;
