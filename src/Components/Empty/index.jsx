import React from 'react';
import './style.less';
import { Icon } from 'semantic-ui-react';

import PropTypes from 'prop-types';

const Empty = ({ text = 'Aucune visite prévue' }) => (
	<div className="empty__block">
		<p>
			<Icon size="huge" name="inbox" />
		</p>
		<p>{text}</p>
	</div>
);
export default Empty;

Empty.propTypes = {
	text: PropTypes.string,
};

Empty.defaultProps = {
	text: '',
};
