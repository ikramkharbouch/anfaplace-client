import React from 'react';
import { Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './OutlineButton.less';

const OutlineButton = ({ icon, text }) => (<button className='outline-btn' type='button'>
    <Icon name={icon} />
    Ajouter à la liste des visites
{text}
</button>)


OutlineButton.propTypes = {
    text: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
};

export default OutlineButton;
