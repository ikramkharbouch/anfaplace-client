import React, { useEffect , useState } from 'react';

import EventCard from 'src/Components/EventCard';
import './MyEventsList.less';
import { useDispatch, useSelector } from 'react-redux';
import { Dimmer, Loader } from 'semantic-ui-react';

const MyEventsList = () => {
	const dispatch = useDispatch();
	const [ loading ,  setLoading] = useState(true);
	// eslint-disable-next-line no-unused-vars
/* 	//const { list: myEventsList,  } = useSelector((state) => state.myEventsList);
 */	const user = useSelector((state) => state.user.currentUser);
	const eventList = useSelector((state) => state.userEventsList);


	useEffect(() => {
		if (user && !eventList.success) {
			dispatch( { type : 'GET_USER_EVENTS'  } );
		}

		if(eventList.success && !eventList.loading){
			console.log(eventList.events)
			setLoading(false)
		}
	}, [user , eventList.events]);

	return loading ? (
		<Dimmer active>
			<Loader />
		</Dimmer>
	) : (
		<div id="my-events-screen">
			{eventList.events.length ? (
				eventList.events.map((event) => <EventCard event={{ data : { ...event } }} />)
			) : (
				<p style={{ textAlign: 'center' }}> aucun evenement </p>
			)}
		</div>
	);
};

export default MyEventsList;
