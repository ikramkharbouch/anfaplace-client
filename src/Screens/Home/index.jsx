import React, { useState, useEffect } from 'react';

import { useInView } from 'react-intersection-observer';
import { KafkaTimeBetweenEventsAndQuestionnaire } from 'src/utils/kafka/KafkaEvents';
// import VisitesList from 'src/Screens/Home/Sections/VisitesList';
// import Discover from 'src/Screens/Home/Sections/Discover';
import Offers from './Sections/Offers';
import Questionnaire from './Sections/Questionaire';
import TrendyEvents from './Sections/TrendyEvents';
import Brands from './Sections/Brands';

const Home = () => {
	const [t0, setT0] = useState(0);
	const [reachedQuestionnaireOnce, setReachedQuestionaireOnce] = useState(false);
	const [ref, questionnaireInView] = useInView({
		threshold: 1,
	});
	useEffect(() => {
		if (!reachedQuestionnaireOnce && questionnaireInView) {
			const TimeBetweenEventsAndQuestionnaire = new KafkaTimeBetweenEventsAndQuestionnaire(
				'123456',
				performance.now() - t0
			);
			TimeBetweenEventsAndQuestionnaire.emitEvent();
			setReachedQuestionaireOnce(true);
		}
	}, [reachedQuestionnaireOnce, questionnaireInView]);

	return (
		<>
			<Offers />
			<TrendyEvents c={() => setT0(performance.now())} />
			<Questionnaire ref={ref} />
			{/* <Discover /> */}
			<Brands />
			{/* <VisitesList /> */}
		</>
	);
};

export default Home;
