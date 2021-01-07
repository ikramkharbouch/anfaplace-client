import React, { useState, useEffect } from 'react';
import Slider from 'src/Components/Slider';
import EntertainmentSlide from 'src/Screens/Entertainment/EntertainmentSlide';
import { InView } from 'react-intersection-observer';
import { useSelector } from 'react-redux';


import './Entertainment.less';


const Entertainment = () => {

	const [eventData, setEventData] = useState([]);
	const events = useSelector((state) => state.event.list);

	useEffect(() => {
		setEventData(events.map(event => ({
			id: event.id,
			...event.data
		})));
	}, [events])




	return (
		<div className="entertainment-screen">

			{eventData.map((evt) => (
				<InView threshold={1} key={evt.id}>
					{({ inView, ref }) => (
						<div ref={ref} className="slider-with-overlay">
							{!inView && <div className="overlay" />}
							<Slider autoplay={inView} id="slider-entertainment-4">
								{
									evt.slider_elements.length > 0 && evt.slider_elements.map((x) => (
										<EntertainmentSlide event={evt} image={x.content.data} />
									))
								}

							</Slider>
						</div>
					)}
				</InView>
			))}


		</div>
	);

}
export default Entertainment;
