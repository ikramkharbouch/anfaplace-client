import React from 'react';
import { useSelector } from 'react-redux';

import { Header } from 'semantic-ui-react';
import { arrayBufferToBase64 } from 'src/utils/utilsFunctions';

import Slider from 'src/Components/Slider';
import QuestionnaireSlide from './QuestionnaireSlide';
import './Questionnaire.less';

const Questionnaire = React.forwardRef((props, ref) => {
	const Questionnaires = useSelector((state) => state.questionnaires.list);
	return (
		<div className="questionnaire" ref={ref}>
			<Header as="h3">
				Questionnaires
				<Header.Subheader> Répondez au questionnaire et gagnez des points </Header.Subheader>
			</Header>
			<Slider
				id="questionnaire"
				slidesOffsetBefore={20}
				autoplay={false}
				pagination={false}
				slidersPerView={1.42}
			>
				{Questionnaires.map(({ index, complet, data: { points, description, marque, visuel } }) => (
					<QuestionnaireSlide
						id={index}
						key={index}
						points={points}
						description={description}
						brands={[marque]}
						completed={complet}
						image={
							arrayBufferToBase64(visuel.data) === 'data:image/jpeg;base64,'
								? visuel
								: arrayBufferToBase64(visuel.data)
						}
					/>
				))}
			</Slider>
		</div>
	);
});

export default Questionnaire;
