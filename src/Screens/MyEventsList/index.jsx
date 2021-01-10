import React, { useEffect } from 'react';
import EventCard from 'src/Components/EventCard';
import './MyEventsList.less';
import myEventsActions from 'src/store/myEvents/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Dimmer, Loader } from 'semantic-ui-react';

const MyEventsList = () => {
	const dispatch = useDispatch();
	// eslint-disable-next-line no-unused-vars
	const { list: myEventsList, loadingList } = useSelector((state) => state.myEventsList);
	const user = useSelector((state) => state.user.currentUser);

	useEffect(() => {
		if (user && loadingList) {
			dispatch({ type: myEventsActions.FETCH_MY_EVENTS });
		}
	}, [user, loadingList]);
	return loadingList ? (
		<Dimmer active>
			<Loader />
		</Dimmer>
	) : (
		<div id="my-events-screen">
			{myEventsList.length ? (
				myEventsList.map((event) => <EventCard event={event} />)
			) : (
				<p style={{ textAlign: 'center' }}> aucun evenement </p>
			)}
		</div>
	);
};

export default MyEventsList;
