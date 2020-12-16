import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Checkbox, Input } from 'semantic-ui-react';
import ScrollArea from 'react-scrollbar';

import Modal from '../Modal';
import './Intersts.less';

const Interests = ({ modalClosedEvent }) => {
  const [open, setOpen] = useState(true);
  const scrollbarStyle = {
    height: 180,
    width: '95%',
    marginTop: 16,
  };
  return (
    <Modal
      open={open}
      setOpen={(isOpen) => {
        setOpen(isOpen);
        modalClosedEvent();
      }}
    >
      <p>Pour une meilleure expérience client, créer votre liste d’intérêt.</p>
      <h4>Vous pouvez configurer votre liste plus tard.</h4>

      <Input className="filter" placeholder="Filter" icon="search" />

      <ScrollArea
        speed={0.8}
        style={scrollbarStyle}
        className="interests"
        verticalContainerStyle={{
          zIndex: 10002,
          backgroundColor: 'rgba(255,255,255,.2)',
          width: 3,
          opacity: 1,
        }}
        verticalScrollbarStyle={{
          borderRadius: 80,
          backgroundColor: '#00A0E3',
          zIndex: 10003,
          width: 3,
        }}
        horizontal={false}
      >
        <Checkbox label="Vetements homme" />
        <Checkbox label="Vetement femme" />
        <Checkbox label="Chaussures homme" />
        <Checkbox label="Chassures femmes" />
        <Checkbox label="Maquillage/Parfumerie" />
        <Checkbox label="Food" />
        <Checkbox label="Maison / Décoration" />
        <Checkbox label="Sport Enfants" />
        <Checkbox label="Vetements homme" />
        <Checkbox label="Vetement femme" />
        <Checkbox label="Chaussures homme" />
        <Checkbox label="Chassures femmes" />
        <Checkbox label="Maquillage/Parfumerie" />
        <Checkbox label="Food" />
        <Checkbox label="Maison / Décoration" />
        <Checkbox label="Sport Enfants" />
        <Checkbox label="Vetements homme" />
        <Checkbox label="Vetement femme" />
        <Checkbox label="Chaussures homme" />
        <Checkbox label="Chassures femmes" />
        <Checkbox label="Maquillage/Parfumerie" />
        <Checkbox label="Food" />
        <Checkbox label="Maison / Décoration" />
        <Checkbox label="Sport Enfants" />
      </ScrollArea>
      <div className="actions">
        <Button className="later">Plus tard</Button>
        <Button circular>Confirmer</Button>
      </div>
    </Modal>
  );
};
Interests.propTypes = {
  modalClosedEvent: PropTypes.func.isRequired,
};

export default Interests;
