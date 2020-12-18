import React from 'react';
import swatch from 'src/assets/images/brands/swatch-logo.svg';
import goSportLogo from 'src/assets/images/brands/GO_Sport_logo.svg';
import beautyLog from 'src/assets/images/brands/Logo-beauty-succes.svg';
import hmLog from 'src/assets/images/brands/h&m.svg';
import Brand from '../Brand';
import './BrandsGrid.less';

const BrandsGrid = () => (
  <div className="brands__grid">
    <Brand withBadge brandImg={goSportLogo} brandName="swatch" brandId="1" />
    <Brand withBadge badgeText="EN PROMO " badgeColor="yellow" brandImg={beautyLog} brandId="1" />
    <Brand
      withBadge
      badgeColor="lightblue"
      badgeText="COLLECTION été"
      brandImg={swatch}
      brandName="swatch"
      brandId="1"
    />
    <Brand withBadge badgeColor="yellow" badgeText="COLLECTION 2021" brandImg={hmLog} brandId="1" />
  </div>
);

export default BrandsGrid;
