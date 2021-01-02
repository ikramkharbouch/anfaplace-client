/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import Slider from 'src/Components/Slider';
import EntertainmentSlide from 'src/Screens/Entertainment/EntertainmentSlide';

import './Entertainment.less';

const Entertainment = () => {
	const [inView, setInView] = useState('1');

	return (
		<div className="entertainment-screen">
			<div onClick={() => setInView('1')} className="slider-with-overlay">
				{inView !== '1' && <div className="overlay" />}
				<Slider autoplay={inView === '1'} id="slider-entertainment">
					<EntertainmentSlide />
					<EntertainmentSlide />
					<EntertainmentSlide />
					<EntertainmentSlide />
				</Slider>
			</div>
			<div onClick={() => setInView('2')} className="slider-with-overlay">
				{inView !== '2' && <div className="overlay" />}
				<Slider autoplay={inView === '2'} id="slider-entertainment-2">
					<EntertainmentSlide />
					<EntertainmentSlide />
					<EntertainmentSlide />
					<EntertainmentSlide />
				</Slider>
			</div>
			<div onClick={() => setInView('3')} className="slider-with-overlay">
				{inView !== '3' && <div className="overlay" />}
				<Slider autoplay={inView === '3'} id="slider-entertainment-3">
					<EntertainmentSlide />
					<EntertainmentSlide />
					<EntertainmentSlide />
					<EntertainmentSlide />
				</Slider>
			</div>
			<div onClick={() => setInView('4')} className="slider-with-overlay">
				{inView !== '4' && <div className="overlay" />}
				<Slider autoplay={inView === '4'} id="slider-entertainment-4">
					<EntertainmentSlide />
					<EntertainmentSlide />
					<EntertainmentSlide />
					<EntertainmentSlide />
				</Slider>
			</div>
		</div>
	);
};

export default Entertainment;
