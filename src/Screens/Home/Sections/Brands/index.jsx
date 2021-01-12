import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Header } from 'semantic-ui-react';
import Slider from 'src/Components/Slider';
import Brand from 'src/Components/Brand';
import './Brands.less';

const Brands = () => {
	const brands = useSelector((state) => state.brand.all);
	const history = useHistory();
	return (
		<div className="brands">
			<Header as="h3">Marques</Header>
			<Slider id="brands" autoplay={false} slidesPerGroup={2} slidesPerColumn={2} slidersPerView={2}>
				{brands.map((marque) => (
					<div key={marque.index} id={marque.data.nom} className="brand-slider-container">
						<Brand
							brandImg={marque?.data?.logo?.data || marque?.data?.logo}
							brandName="swatch"
							brandId={marque.index}
						/>
					</div>
				))}
			</Slider>
			<Button onClick={() => history.push('/all-brands')} className="more" circular>
				Découvrez tous les marques
			</Button>
		</div>
	);
};

export default Brands;
