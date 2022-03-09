import * as React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const variants = {
	open: {
		y: 0,
		opacity: 1,
		transformOrigin: '0% 0%',
		scale: 1,
		transition: {
			y: { stiffness: 1000, velocity: -100 },
		},
	},
	closed: {
		y: 50,
		scale: 0,
		opacity: 0,
		transition: {
			y: { stiffness: 1000 },
		},
		transformOrigin: '0% 0%',
	},
};

// const colors = ['#FF008C', '#D309E1', '#9C1AFF', '#7700FF', '#4400FF'];

// eslint-disable-next-line import/prefer-default-export
export const MenuItem = ({ children }) => (
	<motion.li
		className="test"
		variants={variants}
		whileHover={{ scale: 1.1 }}
		whileTap={{ scale: 0.95 }}
	>
		{children}
	</motion.li>
);

MenuItem.propTypes = {
	children: PropTypes.node.isRequired,
};
