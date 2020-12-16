import React from 'react';
import { TransitionModal } from 'semantic-ui-react-transition-modal';
import PropTypes from 'prop-types';

import './Modal.less';

const Modal = ({ children, open, setOpen }) => (
	<TransitionModal
		closeIcon
		animation="scale"
		duration={350}
		onClose={() => setOpen(false)}
		onOpen={() => setOpen(true)}
		open={open}
		className="custom-modal"
	>
		<TransitionModal.Content>{children}</TransitionModal.Content>
	</TransitionModal>
);

Modal.propTypes = {
	setOpen: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired,
	open: PropTypes.bool,
};
Modal.defaultProps = {
	open: false,
};

export default Modal;
