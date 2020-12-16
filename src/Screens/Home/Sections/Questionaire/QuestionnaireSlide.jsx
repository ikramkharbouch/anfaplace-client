import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import './QuestionnaireSlide.less';
import { Button, Icon, Label } from 'semantic-ui-react';
import questionnaire from 'src/assets/images/temp/questionaire-bg.jpg';
import { ReactComponent as ArrowIcon } from 'src/assets/icons/arrow.svg';

const QuestionnaireSlide = ({ points, brands, description }) => {
	const history = useHistory();
	return (
		<div className="questionnaire-slide">
			<img src={questionnaire} alt="questionnaire" />
			<div className="details">
				<Label className="point">
					<Icon name="gift" size="small" />
					{points}
					{points < 999 && 'p'}
				</Label>
				<div className="tags">
					{brands.map((brand) => (
						<Label>{brand}</Label>
					))}
				</div>
				<p className="description">{description}</p>
				<Button onClick={() => history.push('/survey')}>
					Commencer <ArrowIcon />
				</Button>
			</div>
		</div>
	);
};

QuestionnaireSlide.propTypes = {
	points: PropTypes.number,
	brands: PropTypes.arrayOf(PropTypes.string),
	description: PropTypes.string,
};

QuestionnaireSlide.defaultProps = {
	points: 100,
	brands: ['Mcdo'],
	description: 'Titre de QUESTIONNAIRE sur 2 lignes et coupe la ligne ici blalalalalallala',
};

export default QuestionnaireSlide;
