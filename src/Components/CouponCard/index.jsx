import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Badge from 'src/Components/Badge';

import('./CouponCard.less').then(() => console.log('css imported'));

const CouponCard = ({ url, img, amount, date, points, available, title, active, couponInfos }) => (
    <Link to={{ pathname: url, coupon: { active, available, couponInfos } }} className='coupon-card'>
        <div className="coupon-card__img-container">
            <img src={img} alt="" className="coupon-card__img" />
        </div>
        <div className="coupon-card__description">
            <div className="coupon-card__title">
                <h4> {title} </h4>
                <Badge title={points} color={`${available ? 'green' : 'red'}`} />
            </div>
            <div className="coupon-card__text-container">
                <p className='coupon-card__text'> Profitez <strong> {amount} </strong> de réduction </p>
                <p className='coupon-card__text'> coupon disponible jusqu’au <strong>{date}</strong> </p>
            </div>
        </div>
    </Link>
);

CouponCard.defaultProps = {
    couponInfos: {},
};

CouponCard.propTypes = {
    url: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    amount: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    points: PropTypes.string.isRequired,
    available: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    couponInfos: {
        url: PropTypes.string.isRequired,
        img: PropTypes.string.isRequired,
        amount: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        points: PropTypes.string.isRequired,
        available: PropTypes.bool.isRequired,
        title: PropTypes.string.isRequired,
        active: PropTypes.bool.isRequired
    }
};

export default CouponCard;
