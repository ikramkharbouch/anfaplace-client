import React, { useState } from 'react';
import Proptypes from 'prop-types';
import { motion } from 'framer-motion';

import Brand from '../Brand';
import beautyLogo from '../../assets/images/brands/Logo-beauty-succes.svg';

import './CouponsGrids.less';

const CouponsGrid = ({ menuOpen }) => {
	const initialState = [
		{
			id: 1,
			withBadge: true,
			badgeColor: 'red',
			badgeText: '50p',
			brandLink: 1,
			brandImg: beautyLogo,
		},
		{
			id: 2,
			withBadge: true,
			badgeColor: 'red',
			badgeText: '200p',
			brandLink: 1,
			brandImg: beautyLogo,
		},
		{
			id: 3,
			withBadge: true,
			badgeColor: 'green',
			badgeText: '50p',
			brandLink: 1,
			brandImg: beautyLogo,
		},
		{
			id: 4,
			withBadge: true,
			badgeColor: 'green',
			badgeText: '100p',
			brandLink: 1,
			brandImg: beautyLogo,
		},
		{
			id: 5,
			withBadge: true,
			badgeColor: 'green',
			badgeText: '50p',
			brandLink: 1,
			brandImg: beautyLogo,
		},
		{
			id: 6,
			withBadge: true,
			badgeColor: 'green',
			badgeText: '100p',
			brandLink: 1,
			brandImg: beautyLogo,
		},
	];

	const [coupons] = useState(initialState);

	console.log('menuOpen', menuOpen);

	const variants = {
		start: { opacity: 1, visibility: 'visible', transition: { duration: 0.4, delay: 0.8 } },
		// You can do whatever you want here, if you just want it to stop completely use `rotate: 0`
		reverse: { opacity: 0, visibility: 'hidden', transition: { duration: 0.8 } },
	};

	return (
		<motion.div
			className="coupons-section-container"
			initial={{ y: 10, opacity: 0, visibility: 'hidden' }}
			variants={variants}
			animate={menuOpen ? 'start' : 'reverse'}
		>
			<div className="coupons-section-container">
				<h2 className="app-small-title"> Coupons disponibles </h2>
				{coupons.length && (
					<div className="coupons-list">
						{coupons.map((coupon) => (
							<motion.div className="coupon-brand">
								<Brand
									key={coupon.id}
									withBadge={coupon.withBadge}
									badgeColor={coupon.badgeColor}
									badgeText={coupon.badgeText}
									brandLink={`/coupon/${coupon.id}`}
									brandImg={coupon.brandImg}
								/>
							</motion.div>
						))}
					</div>
				)}
				{!coupons.length && (
					<h3 className="not-available"> Vous n{`&apos;`}avez pas de coupons disponible </h3>
				)}
			</div>
		</motion.div>
	);
};

CouponsGrid.propTypes = {
	menuOpen: Proptypes.bool.isRequired,
};

export default CouponsGrid;
