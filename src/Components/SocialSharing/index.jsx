import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'src/Components/Modal';

import { Facebook, Google, Twitter, Whatsapp, Mail } from 'react-social-sharing';
import { Grid, Header } from 'semantic-ui-react';

const SocialSharing = ({ open, setOpen }) => (
	<Modal open={open} setOpen={setOpen}>
		<Header as="h5"> Partager </Header>
		<Grid widths={16}>
			<Grid.Column width={8}>
				<Facebook style={{ width: 128 }} />
			</Grid.Column>
			<Grid.Column width={8}>
				<Google style={{ width: 128 }} />
			</Grid.Column>
			<Grid.Column width={8}>
				<Twitter style={{ width: 128 }} />
			</Grid.Column>
			<Grid.Column width={8}>
				<Whatsapp style={{ width: 128 }} />
			</Grid.Column>
			<Grid.Column width={8}>
				<Mail style={{ width: 128 }} />
			</Grid.Column>
		</Grid>
	</Modal>
);

SocialSharing.propTypes = {
	open: PropTypes.bool.isRequired,
	setOpen: PropTypes.func.isRequired,
};

export default SocialSharing;
