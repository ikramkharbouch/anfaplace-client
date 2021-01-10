import React from 'react';
import { useHistory } from 'react-router-dom';
import CouponCard from 'src/Components/CouponCard';
import { ReactComponent as QrcodeIcon } from 'src/assets/icons/qrcode.svg';
import Button from 'src/Components/Button';
import './CouponListItem.less';

const CouponListItem = () => {
	const history = useHistory();

	const {
		active,
		amount,
		available,
		date,
		img,
		points,
		title,
		url,
	} = history.location.coupon.couponInfos;

	return (
		<div className="coupon-list-item__screen">
			<div className="coupon-list-item__coupon">
				<CouponCard
					url={url}
					img={img}
					amount={amount}
					date={date}
					points={points}
					available={available}
					title={title}
					active={active}
				/>
			</div>

			{available && active && (
				<>
					<div className="coupon-list-item__qrcodeIcon active">
						<QrcodeIcon />
					</div>
					<p className="coupon-list-item__footer-text">Coupon valable chez Anfaplace uniquement</p>
				</>
			)}

			{available && !active && (
				<>
					<h2 className="coupon-list-item__title">Votre QR Code n’est pas actif</h2>
					<p className="coupon-list-item__text">
						Activer votre QR CODE et profiter des <br /> remises instantanées en magasin
					</p>
					<div className="coupon-list-item__qrcodeIcon">
						<QrcodeIcon />
					</div>
					<Button type="button" text="activer" />
				</>
			)}

			{!available && (
				<>
					<h2 className="coupon-list-item__title not-available">
						Oups !! vous n’avez pas assez de points
					</h2>
					<p className="coupon-list-item__text not-available">Découvez comment gagner des points </p>

					<Button type="button" text="En savoir plus" />
				</>
			)}
		</div>
	);
};

export default CouponListItem;
