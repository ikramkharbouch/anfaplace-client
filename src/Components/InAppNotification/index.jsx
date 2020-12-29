import React from 'react';
import Proptypes from 'prop-types';
import { Icon, Header } from 'semantic-ui-react';
import ReactCSSTransitionReplace from 'react-css-transition-replace';

import './InAppNotification.less';

export const InAppNotificationContext = React.createContext({
	notification: { show: false, type: '' },
});

const WonPoints = () => (
	<Header as="h4" icon inverted>
		<Icon name="gift" />
		Vous avez gagner 50points à l’inscription
	</Header>
);
const DidNotWinPoints = () => (
	<Header as="h4" icon inverted>
		compléter votre profil et gagner des points convertible en bons d’achat !
	</Header>
);

const NotificationSelector = ({ type }) => {
	switch (type) {
		case 'wonPoints':
			return <WonPoints />;
		case 'didNotWinPoints':
			return <DidNotWinPoints />;
		default:
			return <span> default notification </span>;
	}
};
NotificationSelector.propTypes = {
	type: Proptypes.string.isRequired,
};

// eslint-disable-next-line react/prop-types
const InAppNotification = ({
	context: {
		notification: { show, type },
		setNotification,
	},
}) =>
	show && (
		<ReactCSSTransitionReplace
			transitionName="cross-fade"
			transitionEnterTimeout={1000}
			transitionLeaveTimeout={1000}
		>
			{/* eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */}
			<div
				className="notification-container"
				onClick={() => setNotification({ show: false, type })}
				key={type}
			>
				<NotificationSelector type={type} />
			</div>
		</ReactCSSTransitionReplace>
	);

InAppNotification.propTypes = {
	context: Proptypes.shape({
		notification: Proptypes.shape({ show: Proptypes.bool, type: Proptypes.string }),
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
