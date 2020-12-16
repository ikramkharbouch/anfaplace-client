import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { ReactComponent as ArrowIcon } from 'src/assets/icons/arrow.svg';

import './BackButton.less';

const BackButton = ({ text }) => {
	const history = useHistory();

	const handleClick = () => history.goBack();

	return (
		<button type="button" onClick={handleClick} className="back-btn">
			<ArrowIcon className="icon" /> <span className="text"> {text} </span>
		</button>
	);
};
BackButton.propTypes = {
	text: PropTypes.string,
};

BackButton.defaultProps = {
	// icon: 'arrow left',
	text: 'Retour',
};

export default BackButton;
