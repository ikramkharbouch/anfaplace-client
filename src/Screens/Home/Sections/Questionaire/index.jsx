import React from 'react';
import { Header } from 'semantic-ui-react';
import Slider from 'src/Components/Slider';
import QuestionnaireSlide from './QuestionnaireSlide';
import './Questionnaire.less';

const Questionnaire = React.forwardRef((props, ref) => (
	<div className="questionnaire" ref={ref}>
		<Header as="h3">
			Questionnaires
			<Header.Subheader>Lorem ipsum dolor sit amet, consetetur sadipscing</Header.Subheader>
		</Header>
		<Slider
			id="questionnaire"
			slidesOffsetBefore={20}
			autoplay={false}
			pagination={false}
			slidersPerView={1.42}
		>
			<QuestionnaireSlide />
			<QuestionnaireSlide />
			<QuestionnaireSlide />
		</Slider>
	</div>
));

export default Questionnaire;
