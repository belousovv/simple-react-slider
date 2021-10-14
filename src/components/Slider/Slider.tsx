import React, { useEffect, useState } from "react";
import {v4} from "uuid";
import "./Slider.scss";

const Slider: React.FC<PropsType> = ({
  slides,
  loop = true,
  pags = true,
  auto = false,
  navs = true,
  delay = 5000,
}) => {
  const [pointer, setPointer] = useState(0);
  const [arrowLeftDisable, setArrowLeftDisable] = useState(false);
  const [arrowRightDisable, setArrowRightDisable] = useState(false);

  useEffect(() => {
    if (auto) {
      const interval = setInterval(() => {
        nextSlideHandler();
      }, delay);
      return () => {
        clearInterval(interval);
      };
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!loop) {
      if (pointer === slides.length - 1) {
        setArrowRightDisable(true);
      } else {
        setArrowRightDisable(false);
      }
      if (pointer === 0) {
        setArrowLeftDisable(true);
      } else {
        setArrowLeftDisable(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pointer]);

  const prevSlideHandler = () => {
    setPointer((prev) => {
      return prev === 0 ? slides.length - 1 : prev - 1;
    });
  };

  const nextSlideHandler = () => {
    setPointer((prev) => {
      return prev === slides.length - 1 ? 0 : prev + 1;
    });
  };

  const dotClickHandler = (index: number) => {
    setPointer(index);
  };

  const mappedSlides = slides.map((slide, index) => {
    return index === pointer ? (
      <img
        className="slider__img"
        key={v4()}
        src={slide.img}
        alt="slide item"
      />
    ) : (
      <div key={v4()}></div>
    );
  });

  const mappedDots = slides.map((slide, index) => {
    return (
      <span
        className={
          "slider__dot" + (index === pointer ? " slider__dot--active" : "")
        }
        key={v4()}
        onClick={() => dotClickHandler(index)}
      />
    );
  });

  const renderArrows = () => {
    return (
      <>
        <div
          className={
            "slider__arrow slider__arrow--left" +
            (arrowLeftDisable ? " slider__arrow--disable" : "")
          }
          onClick={prevSlideHandler}
        >
          <svg width="20px" height="30px">
            <polyline points="20 0, 0 15, 20 30" fill="#fff" />
          </svg>
        </div>
        <div
          className={
            "slider__arrow slider__arrow--right" +
            (arrowRightDisable ? " slider__arrow--disable" : "")
          }
          onClick={nextSlideHandler}
        >
          <svg width="20px" height="30px">
            <polyline points="0 0, 20 15, 0 30" fill="#fff" />
          </svg>
        </div>
      </>
    );
  };

  const renderPags = () => {
    return (
      <span className="slider__pags">{`${pointer + 1} / ${
        slides.length
      }`}</span>
    );
  };

  return (
    <div className="slider">
      <div className="slider__items">{mappedSlides}</div>
      {navs && renderArrows()}
      {pags && renderPags()}
      <span className="slider__text">{slides[pointer].text}</span>
      <div className="slider__dots">{mappedDots}</div>
    </div>
  );
};

export default Slider;

// Types

type SlideType = {
  img: string;
  text: string;
};

type PropsType = {
  slides: SlideType[];
  loop?: boolean;
  pags?: boolean;
  auto?: boolean;
  navs?: boolean;
  delay?: number;
};
