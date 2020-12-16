import React from 'react';
import './Button.less';
import { Button } from 'semantic-ui-react';

const index = ({ type, text, click, loading }) => {
	const handleClick = () => {
		if (click) {
			click();
		}
	};

	return (
		<Button
			className="btn"
			loading={loading}
			type={type.toLowerCase().trim() === 'submit' ? 'submit' : 'button'}
			onClick={handleClick}
		>
			{' '}
			{text}
		</Button>
	);
};

index.defaultProps = {
	text: 'Valider',
	loading: false,
};

export default index;
