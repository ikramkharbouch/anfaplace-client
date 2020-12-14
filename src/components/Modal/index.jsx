import React from 'react';
import { TransitionModal } from 'semantic-ui-react-transition-modal';
import PropTypes from 'prop-types';
import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';

import './Modal.less';

const Modal = ({ children, open, setOpen }) => (
  <TransitionModal
    animation="scale"
    duration={350}
    onClose={() => setOpen(false)}
    onOpen={() => setOpen(true)}
    open={open}
    closeIcon={<CloseButton setOpen={setOpen} />}
    className="custom-modal"
  >
    <TransitionModal.Content>
      <p>hello</p>
      {children}
    </TransitionModal.Content>
  </TransitionModal>
);
const CloseButton = ({ setOpen }) => (
  <div className="close">
    <button
      type="button"
      onClick={() => {
        setOpen(false);
      }}
    >
      <CloseIcon />
    </button>
  </div>
);
CloseButton.propTypes = {
  setOpen: PropTypes.func.isRequired,
};
Modal.propTypes = {
  setOpen: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  open: PropTypes.bool,
};
Modal.defaultProps = {
  open: false,
};

export default Modal;
