import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BackButton from 'src/Components/BackButton/BackButton';
import { Dimmer, Header, Loader } from 'semantic-ui-react';
import './Coupon.less';
import { useDispatch, useSelector } from 'react-redux';
import couponActions from 'src/store/coupon/actions';
import QrCodeComponent from 'src/Components/qrCode';
import { setLoadingCoupon } from 'src/store/coupon';

const Coupon = () => {
	const { id } = useParams();
	const coupon = useSelector((state) => state.coupon.current);
	const loading = useSelector((state) => state.coupon.loadingCoupon);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(setLoadingCoupon(true));
		dispatch({ type: couponActions.GET_USER_COUPON_BY_ID, payload: id });
	}, []);
	return loading ? (
		<Dimmer active>
			<Loader />
		</Dimmer>
	) : (
		<div className="coupon-screen">
			<BackButton text={coupon.data.title} />
			<img src={coupon.logo} alt="brand" />
			<Header as="h4">Profitez d&apos;une remise de :</Header>
			<Header as="h1" className="reduction">
				-{coupon.data.point} DH
			</Header>
			<div className="qrcode-container">
				<QrCodeComponent qrCodeImg={coupon.qrcode} />
			</div>
			<Header as="h5" className="which-shop">
				Boutique Anfaplace uniquement
			</Header>
		</div>
	);
};

export default Coupon;
