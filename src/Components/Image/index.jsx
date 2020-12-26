import React from 'react';
import { Img } from 'react-image';
import PropTypes from 'prop-types';
import ReactCSSTransitionReplace from 'react-css-transition-replace';
import './Image.less';
import Loader from 'src/Components/Image/Loader';

const Image = ({ src, loader }) => (
	<Img
		src={src}
		container={(children) => (
			<ReactCSSTransitionReplace
				transitionName="cross-fade"
				transitionEnterTimeout={1000}
				transitionLeaveTimeout={1000}
			>
				{children}
			</ReactCSSTransitionReplace>
		)}
		loader={loader}
	/>
);

Image.propTypes = {
	src: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]).isRequired,
	loader: PropTypes.string,
};
Image.defaultProps = {
	loader: <Loader />,
};

export default Image;
