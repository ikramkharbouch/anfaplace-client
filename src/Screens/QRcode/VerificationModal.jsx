import React from 'react';
import PropTypes from 'prop-types';
import { Form, Grid } from 'semantic-ui-react';
import Modal from '../../Components/Modal';
import './VerificationModal.less';

const VerificationModal = ({ open, setOpen }) => (
  <Modal open={open} setOpen={setOpen}>
    <p>Valider votre numéro de téléphone et commencer à collecter des points Anfapoints</p>

    <Form className="verification-form">
      <Grid>
        <Grid.Column width={4} padded>
          <Form.Input placeholder="+212" />
        </Grid.Column>
        <Grid.Column width={12} padded>
          <Form.Input placeholder="Numero tel" type="tel" />
        </Grid.Column>
      </Grid>
      <Form.Checkbox label="Opt-in whatsapp +200 points" />
      <Form.Checkbox label="Validation par SMS +100 points" />
      <Form.Button circular>Confirmer mon numéro</Form.Button>
    </Form>
  </Modal>
);
VerificationModal.propTypes = {
  open: PropTypes.func.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default VerificationModal;
