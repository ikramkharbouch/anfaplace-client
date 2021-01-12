import React, { useState, useEffect } from 'react';
import Slider from 'src/Components/Slider';
import EntertainmentSlide from 'src/Screens/Entertainment/EntertainmentSlide';
import { InView } from 'react-intersection-observer';
import { useSelector } from 'react-redux';
import logoAnfa from 'src/assets/images/logo-small.png';



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
		<div className={`entertainment-screen ${eventData.length < 1 && 'loading'}`}>

			{eventData.map((evt) => (
				<InView threshold={1} key={evt.id}>
					{({ inView, ref }) => (
						<div ref={ref} className="slider-with-overlay">
							{!inView && <div className="overlay" />}
							<Slider autoplay={inView} id="slider-entertainment-4">
								{
									evt.slider_elements.length > 0 && evt.slider_elements.map((x) => (
										<EntertainmentSlide event={evt} image={x.content} />
									))
								}
							</Slider>
						</div>
					)}
				</InView>
			))}

			{eventData.length < 1 && <> <img src={logoAnfa} className='rotate-img' alt="Anfa logo" /> <p> En cours de chargement... </p> </>}


		</div>
	);

}
export default Entertainment;
