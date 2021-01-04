import React from 'react';
import Slider from 'src/Components/Slider';
import EntertainmentSlide from 'src/Screens/Entertainment/EntertainmentSlide';
import { InView } from 'react-intersection-observer';

import './Entertainment.less';

const Entertainment = () => (
	<div className="entertainment-screen">
		<InView threshold={1}>
			{({ inView, ref }) => (
				<div ref={ref} className="slider-with-overlay">
					{!inView && <div className="overlay" />}
					<Slider autoplay={inView} id="slider-entertainment">
						<EntertainmentSlide count={1} />
						{/* <EntertainmentSlide count={1} /> */}
						{/* <EntertainmentSlide count={1} /> */}
						{/* <EntertainmentSlide count={1} /> */}
					</Slider>
				</div>
			)}
		</InView>
		<InView threshold={1}>
			{({ inView, ref }) => (
				<div ref={ref} className="slider-with-overlay">
					{!inView && <div className="overlay" />}
					<Slider autoplay={inView} id="slider-entertainment-2">
						<EntertainmentSlide />
						<EntertainmentSlide />
						<EntertainmentSlide />
						<EntertainmentSlide />
					</Slider>
				</div>
			)}
		</InView>
		<InView threshold={1}>
			{({ inView, ref }) => (
				<div ref={ref} className="slider-with-overlay">
					{!inView && <div className="overlay" />}
					<Slider autoplay={inView} id="slider-entertainment-3">
						<EntertainmentSlide />
						<EntertainmentSlide />
						<EntertainmentSlide />
						<EntertainmentSlide />
					</Slider>
				</div>
			)}
		</InView>
		<InView threshold={1}>
			{({ inView, ref }) => (
				<div ref={ref} className="slider-with-overlay">
					{!inView && <div className="overlay" />}
					<Slider autoplay={inView} id="slider-entertainment-4">
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
