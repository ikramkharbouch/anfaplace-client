import React from 'react';
import BackButton from 'src/Components/BackButton/BackButton';
import brandLogo from 'src/assets/images/brands/Logo-beauty-succes.svg';
import { Header, Icon } from 'semantic-ui-react';
import './Coupon.less';

const Coupon = () => (
	<div className="coupon-screen">
		<BackButton text="QRCODE BEAUTY SUCCESS TITRE LONG RETOUR A LA LIGNE" />
		<img src={brandLogo} alt="brand" />
		<Header as="h4">Profitez d&apos;une remise de :</Header>
		<Header as="h1" className="reduction">
			-100 DH
		</Header>
		<Icon name="qrcode" />
		<Header as="h5" className="which-shop">
			Boutique Anfaplace uniquement{' '}
		</Header>
	</div>
);

export default Coupon;
