import React from 'react';

import Brand from '../Brand';
import './BrandsGrid.less';

import swatch from '../../assets/images/brands/swatch-logo.svg';
import goSportLogo from '../../assets/images/brands/GO_Sport_logo.svg';
import beautyLog from '../../assets/images/brands/Logo-beauty-succes.svg';

const BrandsGrid = () => (
	<div className="brands__grid">
		<Brand
			withBadge
			badgeColor="lightblue"
			badgeText="COLLECTION ÉTÉ"
			brandImg={swatch}
			brandName="swatch"
			brandId="1"
			brandLink='/brands/1'
		/>
		<Brand withBadge={false} brandImg={swatch} brandId="1" brandLink='/brands/6' />
		<Brand
			withBadge
			badgeColor="yellow"
			badgeText="collection 2021"
			brandImg={goSportLogo}
			brandName="swatch"
			brandId="2"
			brandLink='/brands/2'
		/>
		<Brand withBadge={false} brandImg={swatch} brandId="1" brandLink='/brands/3' />
		<Brand withBadge={false} brandImg={beautyLog} brandId="1" brandLink='/brands/4' />
		<Brand
			withBadge
			badgeColor="yellow"
			badgeText="collection 2021"
			brandImg={goSportLogo}
			brandName="swatch"
			brandId="3"
			brandLink='/brands/5'
		/>
	</div>
);

export default BrandsGrid;
