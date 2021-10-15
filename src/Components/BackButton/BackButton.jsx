import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import './BackButton.less';

const backButtonText = {
	shopping: 'shopping',
	restauration: 'Restauration',
	entertainment: 'Divertissement',
	tour: '',
	brand: 'Marque',
	qrcode: 'QR code',
	'my-visited-list': 'Ma liste de visite ',
	'my-events-list': 'Ma liste d’évènement ',
};
const BackButton = ({ path, className, text }) => {
	const history = useHistory();

	const handleClick = () => history.goBack();

	return (
		<button type="button" onClick={handleClick} className={`back-btn ${className}`}>
			<Icon name="arrow left" /> 
			<span className="text"> {backButtonText[path] || text} </span>
		</button>
	);
};
BackButton.propTypes = {
	path: PropTypes.string,
	className: PropTypes.string,
	text: PropTypes.string,
};

BackButton.defaultProps = {
	path: '',
	className: '',
	text: '',
};

export default BackButton;
