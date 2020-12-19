import React from 'react';
import Navigation from './Components/Navigation';
import Offers from './Sections/Offers';
import Questionnaire from './Sections/Questionaire';
import TrendyEvents from './Sections/TrendyEvents';
import Brands from './Sections/Brands';

const Home = () => (
	<>
		<Navigation />
		<Offers />
		<TrendyEvents />
		<Questionnaire />
		<Brands />
	</>
);

export default Home;
