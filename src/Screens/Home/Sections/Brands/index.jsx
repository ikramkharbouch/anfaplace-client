import React from 'react';
import { Header } from 'semantic-ui-react';
import './Brands.less';
import BrandsGrid from '../../../../Components/BrandsGrid';
import Slider from '../../../../Components/Slider';

const Brands = () => (
  <div className="brands">
    <Header as="h3">Marques</Header>
    <Slider>
      <BrandsGrid />
      <BrandsGrid />
      <BrandsGrid />
    </Slider>
  </div>
);

export default Brands;
