import React from 'react';
import PropTypes from 'prop-types';
import './Badge.less';

const Badge = ({ title, color }) => (
	<div className={`badge round-radius badge-${color.trim()}`}> {title} </div>
);

Badge.defaultProps = {
	title: `collection ${new Date().getFullYear()}`,
	color: 'yellow',
};

Badge.propTypes = {
	title: PropTypes.string,
	color: PropTypes.string,
};

export default Badge;
