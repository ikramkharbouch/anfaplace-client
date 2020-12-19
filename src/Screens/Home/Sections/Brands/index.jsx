import React from 'react';
import { Header } from 'semantic-ui-react';
import './Brands.less';
import Slider from 'src/Components/Slider';
import Brand from 'src/Components/Brand';
import goSportLogo from 'src/assets/images/brands/GO_Sport_logo.svg';
import beautyLog from 'src/assets/images/brands/Logo-beauty-succes.svg';
import swatch from 'src/assets/images/brands/swatch-logo.svg';
import hmLog from 'src/assets/images/brands/h&m.svg';

const Brands = () => (
	<div className="brands">
		<Header as="h3">Marques</Header>
		<Slider id="brands" autoplay={false} slidesPerGroup={2} slidesPerColumn={2} slidersPerView={2}>
			<div className="brand-slider-container">
				<Brand brandImg={goSportLogo} brandName="swatch" brandLink="/brand/:1" />
			</div>
			<div className="brand-slider-container">
				<Brand badgeColor="yellow" brandImg={beautyLog} brandLink="/brand/:1" />
			</div>
			<div className="brand-slider-container">
				<Brand badgeColor="lightblue" brandImg={swatch} brandName="swatch" brandLink="/brand/:1" />
			</div>
			<div className="brand-slider-container">
				<Brand badgeColor="yellow" brandImg={hmLog} brandLink="/brand/:1" />
			</div>
			<div className="brand-slider-container">
				<Brand brandImg={goSportLogo} brandName="swatch" brandLink="/brand/:1" />
			</div>
			<div className="brand-slider-container">
				<Brand badgeColor="yellow" brandImg={beautyLog} brandLink="/brand/:1" />
			</div>
			<div className="brand-slider-container">
				<Brand badgeColor="lightblue" brandImg={swatch} brandName="swatch" brandLink="/brand/:1" />
			</div>
			<div className="brand-slider-container">
				<Brand badgeColor="yellow" brandImg={hmLog} brandLink="/brand/:1" />
			</div>
			<div className="brand-slider-container">
				<Brand brandImg={goSportLogo} brandName="swatch" brandLink="/brand/:1" />
			</div>
			<div className="brand-slider-container">
				<Brand badgeColor="yellow" brandImg={beautyLog} brandLink="/brand/:1" />
			</div>
			<div className="brand-slider-container">
				<Brand badgeColor="lightblue" brandImg={swatch} brandName="swatch" brandLink="/brand/:1" />
			</div>
			<div className="brand-slider-container">
				<Brand badgeColor="yellow" brandImg={hmLog} brandLink="/brand/:1" />
			</div>
		</Slider>
	</div>
);

export default Brands;
