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
};
const BackButton = ({ path, className }) => {
	const history = useHistory();

	const handleClick = () => history.goBack();

	return (
		<button type="button" onClick={handleClick} className={`back-btn ${className}`}>
			<Icon name="arrow left" /> <span className="text"> {backButtonText[path]} </span>
		</button>
	);
};
BackButton.propTypes = {
	path: PropTypes.string,
	className: PropTypes.string,
};

BackButton.defaultProps = {
	path: '',
	className: '',
};

export default BackButton;
