import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Slider from 'src/Components/Slider';
import EntertainmentSlide from 'src/Screens/Entertainment/EntertainmentSlide';
import { InView } from 'react-intersection-observer';
// import logoAnfa from 'src/assets/images/logo-small.png';
import firebaseApp from 'src/utils/initApp';
import './Entertainment.less';
import { Dimmer } from 'semantic-ui-react';
import Loader from 'src/Components/Image/Loader';
import { API } from 'src/utils/utilsFunctions';
import { useSelector } from 'react-redux';
import Empty from 'src/Components/Empty/index';

const Entertainment = () => {
	const [eventData, setEventData] = useState([]);
	const [loading, setLoading] = useState(true);
	const user = useSelector((state) => state.user.currentUser);
	const location = useLocation();
	useEffect(() => {
		if (location.pathname === '/events') {
			API({ url: '/getAllEvents' })
				.then((result) => {
					setEventData(
						result.data.lists.map((event) => ({
							id: event.id,
							...event.data,
						}))
					);
					setLoading(false);
				})
				.catch((error) => console.error(error));
		} else if (user) {
			firebaseApp
				.auth()
				.currentUser.getIdToken(true)
				.then((token) => {
					API({ url: 'getAllEventsForUser', token })
						.then((result) => {
							setEventData(
								result.data.lists.map((event) => ({
									id: event.id,
									...event.data,
								}))
							);
							setLoading(false);
						})
						.catch((error) => console.error(error));
				});
		} else {
			API({ url: 'getAllEventsinApp' })
				.then((result) => {
					setEventData(
						result.data.lists.map((event) => ({
							id: event.id,
							...event.data,
						}))
					);
					setLoading(false);
				})
				.catch((error) => console.error(error));
		}
	}, [user]);

	return loading ? (
		<Dimmer active>
			<Loader />
		</Dimmer>
	) : (
		<div className={`entertainment-screen ${eventData.length < 1 && 'loading'}`}>
			{eventData.map((evt) => (
				<InView threshold={1} key={evt.id}>
					{({ inView, ref }) => (
						<div ref={ref} className="slider-with-overlay">
							{!inView && <div className="overlay" />}
							<Slider autoplay={inView} id="slider-entertainment-4">
								{evt.slider_elements.length > 0 &&
									evt.slider_elements.map((x) => <EntertainmentSlide event={evt} image={x.content} />)}
							</Slider>
						</div>
					)}
				</InView>
			))}

			{eventData.length < 1 && (
				<Empty text="Cette section est vide" />
				// <>
				// 	{' '}
				// 	<img src={logoAnfa} className="rotate-img" alt="Anfa logo" />{' '}
				// 	<p> Divertissement vide pour le moment... </p>{' '}
				// </>
			)}
		</div>
	);
};
export default Entertainment;
