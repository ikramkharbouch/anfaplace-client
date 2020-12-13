import React from 'react';
import { TransitionModal } from 'semantic-ui-react-transition-modal';
import PropTypes from 'prop-types';


import './Modal.less';


const index = ({ children, open, setOpen }) => (

    <TransitionModal
        animation="scale"
        duration={350}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        closeIcon={<div className='d-flex justify-content-end px-2 pt-10px'><CloseIcon setOpen={setOpen} /></div>}
        className='custom-modal'
    >
        <TransitionModal.Content >
            <p>hello</p>
            {children}
        </TransitionModal.Content>
    </TransitionModal>
)

const CloseIcon = ({ setOpen }) => (
    <svg onClick={() => setOpen(false)} version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"> <path fill="#fff" d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z" />   </svg >
);

CloseIcon.propTypes = {
    setOpen: PropTypes.func.isRequired,
};

export default index;
