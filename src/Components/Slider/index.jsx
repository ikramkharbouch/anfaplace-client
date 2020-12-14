import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SwiperCore, { Pagination, Autoplay } from 'swiper';

// Import Swiper styles
import 'swiper/swiper.less';
import 'swiper/components/pagination/pagination.less';
import { Swiper, SwiperSlide } from 'swiper/react';
import './Slider.less';

const customBulletPagination = (swiper, current, total) => {
  const bullet = (index) =>
    `<span ${total === 1 ? 'style="background-color: #ffffff"' : ''} class="slider-bullet  ${
      total > 1 && index === current ? 'current' : ''
    }${index < current ? 'prev' : ''}"></span>`;
  let paginationHtml = '';

  for (let i = 1; i <= total; i += 1) {
    paginationHtml += bullet(i, current);
  }
  return paginationHtml;
};

const Slider = ({
  className,
  slidersPerView,
  pagination,
  autoplay,
  autoplayDelay,
  timeOnSliderEvent,
  timeToReachEndOfSlider,
  children,
}) => {
  const [t0InitSlider, setT0InitSlider] = useState(0);
  const [t0SliderTouch, setT0SliderTouch] = useState(0);

  const handleInitSlide = () => {
    setT0InitSlider(performance.now());
    console.log('init');
  };

  const handleTouch = (swiper, event) => {
    if (event.type === 'touchstart') {
      setT0SliderTouch(performance.now());
      document.getElementsByClassName('slider-bullet current')[0].classList.add('reset-progress');
      swiper.autoplay.stop();
    }
    if (event.type === 'touchend') {
      timeOnSliderEvent({
        time: performance.now() - t0SliderTouch,
        sliderIndex: swiper.activeIndex,
      });
      document
        .getElementsByClassName('slider-bullet current')[0]
        .classList.remove('reset-progress');

      swiper.autoplay.start();
    }
  };

  const handleReachEnd = () => {
    timeToReachEndOfSlider({ time: performance.now() - t0InitSlider });
  };

  if (pagination) {
    SwiperCore.use([Pagination]);
  }
  if (autoplay) {
    SwiperCore.use([Autoplay]);
  }

  return (
    <Swiper
      watchSlidesProgress
      className={className}
      spaceBetween={20}
      slidesPerView={slidersPerView}
      onInit={handleInitSlide}
      onReachEnd={handleReachEnd}
      onTouchStart={handleTouch}
      onTouchEnd={handleTouch}
      // onSlideChangeTransitionStart={() =>
      //   document.getElementsByClassName('slider-bullet current')[0].classList.remove('progress')
      // }
      // onTransitionEnd={() =>
      //   document.getElementsByClassName('slider-bullet current')[0].classList.add('progress')
      // }
      autoplay={
        autoplay
          ? {
              delay: autoplayDelay,
              disableOnInteraction: false,
            }
          : autoplay
      }
      pagination={
        pagination && {
          type: 'custom',
          renderCustom: (swiper, current, total) => customBulletPagination(swiper, current, total),
        }
      }
    >
      {React.Children.map(children, (child) => (
        <SwiperSlide>{child}</SwiperSlide>
      ))}
    </Swiper>
  );
};
export default Slider;
Slider.propTypes = {
  className: PropTypes.string,
  slidersPerView: PropTypes.number,
  pagination: PropTypes.bool,
  children: PropTypes.node,
  autoplay: PropTypes.bool,
  autoplayDelay: PropTypes.number,
  timeOnSliderEvent: PropTypes.func,
  timeToReachEndOfSlider: PropTypes.func,
};
Slider.defaultProps = {
  className: '',
  slidersPerView: 1,
  pagination: true,
  children: [],
  autoplay: true,
  autoplayDelay: 2000,
  timeOnSliderEvent() {
    return { timeOnSlider: 0, sliderIndex: 0 };
  },
  timeToReachEndOfSlider() {
    return { time: 0 };
  },
};
