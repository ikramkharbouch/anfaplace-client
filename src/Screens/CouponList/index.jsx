import React, { useEffect } from 'react';
import CouponCard from 'src/Components/CouponCard';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dimmer, Loader } from 'semantic-ui-react';
import couponActions from 'src/store/coupon/actions';
import Empty from 'src/Components/Empty/index';
import { openAuthModal } from 'src/store/shared/index';

import('./CouponList.less');

const CouponList = () => {
	const coupons = useSelector((state) => state.coupon);
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.currentUser);

	useEffect(() => {
		if (!coupons.list) {
			dispatch({ type: couponActions.GET_USER_COUPONS });
		}
	}, [coupons, user]);

	// eslint-disable-next-line no-nested-ternary
	return !user ? (
		<>
			<p style={{ textAlign: 'center', marginTop: 44 }}> Merci de vous connecter ! </p>
			<div className="action" style={{ display: 'flex', justifyContent: 'center' }}>
				<Button
					circular
					onClick={() => {
						if (!user) {
							dispatch(openAuthModal(true));
						}
					}}
				>
					Activer mon compte
				</Button>
			</div>
		</>
	) : coupons.loading ? (
		<Dimmer active>
			<Loader />
		</Dimmer>
	) : (
		<div className="coupon-list__screen">
			<h2 className="coupon-list__title"> Vous avez {user.points} points </h2>
			<div className="coupon-list__cards">
				{coupons?.list.length > 0 &&
					coupons.list.map((coupon) => (
						<CouponCard
							key={coupon.id}
							url={`/coupon/${coupon.id}`}
							img={coupon.logo}
							amount={`${coupon.data.point}dh`}
							date={coupon.data.fin_time}
							points={coupon.data.point}
							title={coupon.data.brand}
							active={coupon.data.active}
						/>
					))}
			</div>
			{coupons.list?.length > 0 && (
				<div className="coupon-list__footer">
					<p className="coupon-list__footer-text">
						<span className="red circle dot" />
						<span>Coupon bloqué</span>
					</p>
					<p className="coupon-list__footer-text">
						<span className="green circle dot" />
						<span>Coupon disponible</span>
					</p>
				</div>
			)}

			{coupons.list?.length < 1 && <Empty text="Liste de coupons vide" />}
		</div>
	);
};

export default CouponList;
