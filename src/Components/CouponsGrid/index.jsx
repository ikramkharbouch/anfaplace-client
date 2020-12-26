import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap_white.css';

import Brand from '../Brand';
import beautyLogo from '../../assets/images/brands/Logo-beauty-succes.svg';

import './CouponsGrids.less';

const CouponsGrid = ({ menuOpen, closeMenu }) => {
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

	const couponContainer = useRef(null);

	const [coupons] = useState(initialState);

	const variants = {
		start: { opacity: 1, transition: { duration: 0.2, delay: 0.4 } },
		reverse: { opacity: 0, transition: { duration: 0.2 } },
	};

	const handleStart = () => {
		couponContainer.current.style.display = 'block';
		couponContainer.current.parentNode.style.display = 'block';
	};

	const handleComplete = () => {
		if (!menuOpen) {
			couponContainer.current.style.display = 'none';
			couponContainer.current.parentNode.style.display = 'none';
		}
	};

	return (
		<motion.div
			className="coupons-section-container"
			ref={couponContainer}
			style={{ display: 'none' }}
			initial={{ y: 10, opacity: 0 }}
			variants={variants}
			animate={menuOpen ? 'start' : 'reverse'}
			onAnimationStart={handleStart}
			onAnimationComplete={handleComplete}
		>
			<div className="coupons-section-container">
				<h3 className="app-small-title"> Coupons disponibles </h3>

				{coupons.length && (
					<div className="coupons-list">
						{coupons.map((coupon) =>
							coupon.badgeColor === 'red' ? (
								<Tooltip
									className="tooltip"
									placement="left"
									trigger={['click']}
									overlay={<span>Petit message tooltip</span>}
								>
									<motion.div className="coupon-brand">
										<Brand
											key={coupon.id}
											withBadge={coupon.withBadge}
											badgeColor={coupon.badgeColor}
											badgeText={coupon.badgeText}
											brandImg={coupon.brandImg}
										/>
									</motion.div>
								</Tooltip>
							) : (
								<motion.div onClick={closeMenu} className="coupon-brand">
									<Brand
										key={coupon.id}
										withBadge={coupon.withBadge}
										badgeColor={coupon.badgeColor}
										badgeText={coupon.badgeText}
										brandLink={`/coupon/${coupon.id}`}
										brandImg={coupon.brandImg}
									/>
								</motion.div>
							)
						)}
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
	menuOpen: PropTypes.bool.isRequired,
	closeMenu: PropTypes.func.isRequired,
};

export default CouponsGrid;
