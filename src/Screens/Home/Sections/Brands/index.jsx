import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Header } from 'semantic-ui-react';
import { shuffle } from 'src/utils/utilsFunctions';
import Slider from 'src/Components/Slider';
import Brand from 'src/Components/Brand';
import './Brands.less';

const chunk = (arr, size) =>
  arr
    .reduce((acc, _, i) =>
      (i % size)
        ? acc
        : [...acc, arr.slice(i, i + size)]
    , [])


const Brands = () => {
	const brands = useSelector((state) => state.brand.all);
	const history = useHistory();
	const [allBrands, setAllBrands] = useState([]);



	useEffect(() => {
		setAllBrands(shuffle(brands));
	}, [brands]);

	// console.log(allBrands?.filter( x => x?.data?.categorie?.toLowerCase() === 'divertissement' ))

	return (
		<div className="brands">
			<Header as="h3">Marques</Header>
			<Slider id="brands" autoplay={false} >
				{
					// allBrands.filter((_, index) => index < 20)				
					chunk(allBrands.filter((_, index) => index < 20) , 4)
					.map((item) => (
						<div style = {{ display : 'grid' , gridTemplateColumns : '1fr 1fr' , justifyContent : 'center' , marginBottom : 20 }}>
							{
								item?.map( marque => <div key={marque.index} id={marque.data.nom} className="brand-slider-container">
								<Brand
									brandImg={marque?.data?.logo?.data || marque?.data?.logo}
									brandName="swatch"
									brandId={marque.index}
									isPromo={marque.data.enPromotion}
								/>
							</div> )
							}
						</div>
					))}
			</Slider>
			<Button onClick={() => history.push('/all-brands')} className="more" circular>
				Découvrez toutes les marques
			</Button>
		</div>
	);
};

export default Brands;
