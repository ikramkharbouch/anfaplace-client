import React from 'react';
import Slider from 'src/Components/Slider';
import EntertainmentSlide from 'src/Screens/Entertainment/EntertainmentSlide';
import BackButton from 'src/Components/BackButton/BackButton';
import { InView } from 'react-intersection-observer';

import './Entertainment.less';

const Entertainment = () => (
	<div className="entertainment-screen">
		<BackButton text="Entertainment" />
		<InView threshold={0.82}>
			{({ inView, ref }) => (
				<div ref={ref} className="slider-with-overlay">
					{!inView && <div className="overlay" />}
					<Slider id="slider-entertainment">
						<EntertainmentSlide />
						<EntertainmentSlide />
						<EntertainmentSlide />
						<EntertainmentSlide />
					</Slider>
				</div>
			)}
		</InView>
		<InView threshold={0.82}>
			{({ inView, ref }) => (
				<div ref={ref} className="slider-with-overlay">
					{!inView && <div className="overlay" />}
					<Slider id="slider-entertainment-2">
						<EntertainmentSlide />
						<EntertainmentSlide />
						<EntertainmentSlide />
						<EntertainmentSlide />
					</Slider>
				</div>
			)}
		</InView>
		<InView threshold={0.82}>
			{({ inView, ref }) => (
				<div ref={ref} className="slider-with-overlay">
					{!inView && <div className="overlay" />}
					<Slider id="slider-entertainment-3">
						<EntertainmentSlide />
						<EntertainmentSlide />
						<EntertainmentSlide />
						<EntertainmentSlide />
					</Slider>
				</div>
			)}
		</InView>
		<InView threshold={0.82}>
			{({ inView, ref }) => (
				<div ref={ref} className="slider-with-overlay">
					{!inView && <div className="overlay" />}
					<Slider id="slider-entertainment-4">
						<EntertainmentSlide />
						<EntertainmentSlide />
						<EntertainmentSlide />
						<EntertainmentSlide />
					</Slider>
				</div>
			)}
		</InView>
	</div>
);

export default Entertainment;
