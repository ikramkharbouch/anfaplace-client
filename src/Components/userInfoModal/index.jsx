import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'src/Components/Modal';
import { UserInfos } from 'src/Components/numberAuth';

const UserInfoModal = ({ confirmUserInfo, open, setOpen }) => (
	<Modal open={open} setOpen={setOpen}>
		<UserInfos
			confirm={(values) => {
				localStorage.setItem('user-info', JSON.stringify(values));

				confirmUserInfo();
			}}
		/>
	</Modal>
);

UserInfoModal.propTypes = {
	confirmUserInfo: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
	setOpen: PropTypes.func.isRequired,
};
export default UserInfoModal;
