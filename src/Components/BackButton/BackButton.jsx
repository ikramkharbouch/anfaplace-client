import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

import './BackButton.less';

const BackButton = ({ text }) => {
	const history = useHistory();

	const handleClick = () => history.goBack();

	return (
		<button type="button" onClick={handleClick} className="back-btn">
			<Icon name="arrow left" /> <span className="text"> {text} </span>
		</button>
	);
};
BackButton.propTypes = {
	text: PropTypes.string,
};

BackButton.defaultProps = {
	// icon: 'arrow left',
	text: '',
};

export default BackButton;
