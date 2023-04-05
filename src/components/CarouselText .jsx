import React, { useState } from "react";
import css from "../assets/styles/components/carouselText.module.scss";

const CarouselText = ({ children }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const onNextTextClick = () => {
    setCurrentTextIndex((prevIndex) =>
      prevIndex === children.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className={css.carouselText}>
      <div className={css.content}>
        {children.map((text, index) => (
          <div
            key={index}
            className={
              index === currentTextIndex
                ? css.textContainerActive
                : css.textContainerInactive
            }
          >
            <p>{text}</p>
          </div>
        ))}
      </div>
      <div className={css.buttonContainer}>
        <a href="#" onClick={onNextTextClick}>
          Ver más
        </a>
      </div>
    </div>
  );
};

export default CarouselText;
