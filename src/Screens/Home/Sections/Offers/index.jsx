import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import customParseFormat from 'dayjs/plugin/customParseFormat';

/* import { removeTags } from 'src/utils/utilsFunctions';
 */ import './Offers.less';
import Slider from 'src/Components/Slider';
import OfferSlide from './OfferSlide';

dayjs.locale('fr');

dayjs.extend(customParseFormat);

const Offers = () => {
	const [offers, setOffers] = useState([]);
	const articles = useSelector((state) => state.articles);

	useEffect(() => {
		setOffers(articles.list);
	}, [articles]);

	return (
		<>
			{offers.length > 0 && (
				<Slider className="slider" id="offers" autoplayDelay={3000}>
					{offers.map((article) => (
						<OfferSlide
							date={`${dayjs(article.debut_time, 'DD/MM/YYYY').format('D MMM')} - ${dayjs(
								article.fin_time,
								'DD/MM/YYYY'
							).format('D MMM')}`}
							key={article.id}
							image={article.banniere}
							description={article.titre}
							article={article}
						/>
					))}
				</Slider>
			)}
			{offers.length < 1 && <OfferSlide />}
		</>
	);
};

export default Offers;
