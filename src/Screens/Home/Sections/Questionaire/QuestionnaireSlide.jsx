import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import './QuestionnaireSlide.less';
import { Button, Header, Icon, Label } from 'semantic-ui-react';
import questionnaire from 'src/assets/images/temp/questionaire-bg.jpg';
import { ReactComponent as ArrowIcon } from 'src/assets/icons/arrow.svg';

const QuestionnaireSlide = ({ points, brands, description, title, image, id, completed }) => {
	const history = useHistory();
	return (
		<div className="questionnaire-slide">
			<img src={image} alt="questionnaire" />
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
				<Header as="h5" style={{ margin: 0 }}>
					{title}
				</Header>
				<p className="description">{description}</p>
				{!completed ? (
					<Button onClick={() => history.push(`/survey/${id}`)}>
						Commencer <ArrowIcon />
					</Button>
				) : (
					<Label color="green"> Terminé </Label>
				)}
			</div>
		</div>
	);
};

QuestionnaireSlide.propTypes = {
	completed: PropTypes.bool,
	points: PropTypes.number,
	brands: PropTypes.arrayOf(PropTypes.string),
	title: PropTypes.string,
	description: PropTypes.string,
	image: PropTypes.string,
	id: PropTypes.string.isRequired,
};

QuestionnaireSlide.defaultProps = {
	completed: false,
	points: 100,
	title: '',
	brands: ['Mcdo'],
	description: 'Titre de QUESTIONNAIRE sur 2 lignes et coupe la ligne ici blalalalalallala',
	image: questionnaire,
};

export default QuestionnaireSlide;
