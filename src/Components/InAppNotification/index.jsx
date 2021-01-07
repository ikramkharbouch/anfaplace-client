import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Proptypes from 'prop-types';
import { Icon, Header } from 'semantic-ui-react';
import './InAppNotification.less';
import { setNotification } from 'src/store/app';

export const InAppNotificationContext = React.createContext({
	notification: { show: false, type: '' },
});

const WonPoints = () => (
	<Header as="h4" icon>
		<Icon name="gift" size="mini" />
		Vous avez gagner 50points à l’inscription
	</Header>
);
const DidNotWinPoints = () => (
	<Header as="h4">compléter votre profil et gagner des points convertible en bons d’achat !</Header>
);

const NotificationSelector = ({ type, message }) => {
	switch (type) {
		case 'wonPoints':
			return <WonPoints />;
		case 'didNotWinPoints':
			return <DidNotWinPoints />;
		case 'error':
			return <Header as="h4">Une erreur est servenu :{message} </Header>;
		default:
			return <span> default notification </span>;
	}
};
NotificationSelector.propTypes = {
	type: Proptypes.string.isRequired,
	message: Proptypes.string,
};
NotificationSelector.defaultProps = {
	message: '',
};

// eslint-disable-next-line react/prop-types
const InAppNotification = () => {
	const [slideUp, setSlideUp] = useState(false);
	const { show, type, message } = useSelector((state) => state.app.notification);
	const dispatch = useDispatch();
	useEffect(() => {
		setTimeout(() => {
			if (show) {
				setSlideUp(true);
				setTimeout(() => {
					dispatch(setNotification({ show: false, type }));
				}, 300);
			}
		}, 5000);
	}, [show]);

	return (
		show && (
			// eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events
			<div
				className={`notification-container ${slideUp ? 'slideUp' : ''} ${
					type === 'error' ? 'error' : ''
				}`}
				onClick={() => {
					setSlideUp(true);
					setTimeout(() => {
						setNotification({ show: false, type });
					}, 200);
				}}
			>
				<NotificationSelector type={type} message={message} />
			</div>
		)
	);
};

InAppNotification.propTypes = {
	context: Proptypes.shape({
		notification: Proptypes.shape({
			show: Proptypes.bool,
			type: Proptypes.string,
			message: Proptypes.string,
		}),
		setNotification: Proptypes.func,
	}).isRequired,
};

export const withContext = (Component) => (props) => (
	<InAppNotificationContext.Consumer>
		{/* eslint-disable-next-line react/jsx-props-no-spreading */}
		{(context) => <Component {...props} context={context} />}
	</InAppNotificationContext.Consumer>
);

export default withContext(InAppNotification);
