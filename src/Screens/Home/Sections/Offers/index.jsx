import React from 'react';
import './Offers.less';
import Slider from '../../../../Components/Slider';
import OfferSlide from './OfferSlide';

const Offers = () => (
  <Slider
    className="slider"
    timeOnSliderEvent={(value) => console.log(value)}
    timeToReachEndOfSlider={(value) => console.log(value)}
  >
    <OfferSlide />
    <OfferSlide />
    <OfferSlide />
  </Slider>
);

export default Offers;
