import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Badge from 'src/Components/Badge';
import { useSelector } from 'react-redux';

import('./CouponCard.less');

const CouponCard = ({ url, img, amount, date, points, title }) => {
	const userPoints = useSelector((state) => state.user.currentUser?.points) || 0;

	return (
		<Link to={{ pathname: url }} className="coupon-card">
			<div className="coupon-card__img-container">
				<img src={img} alt="" className="coupon-card__img" />
			</div>
			<div className="coupon-card__description">
				<div className="coupon-card__title">
					<h4> {title} </h4>
					<Badge
						title={`${points === 0 ? 'Coupon gratuit' : `${points} points`}`}
						color={`${userPoints >= points ? 'green' : 'red'}`}
					/>
				</div>
				<div className="coupon-card__text-container">
					<p className="coupon-card__text">
						Ajouter <strong> {amount} </strong> de réduction
					</p>
					<p className="coupon-card__text">
						coupon disponible jusqu’au <strong>{date}</strong>
					</p>
				</div>
			</div>
		</Link>
	);
};

CouponCard.defaultProps = {};

CouponCard.propTypes = {
	url: PropTypes.string.isRequired,
	img: PropTypes.string.isRequired,
	amount: PropTypes.string.isRequired,
	date: PropTypes.string.isRequired,
	points: PropTypes.string.isRequired,
	title: PropTypes.string,
};

CouponCard.defaultProps = {
	title: '',
};

export default CouponCard;
