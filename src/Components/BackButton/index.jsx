import React from 'react';
import { useHistory } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

import './BackButton.less';

const index = ({ text, icon }) => {
    const history = useHistory();

    const handleClick = () => history.goBack();

    return (
        <button type='button' onClick={handleClick} className='back-btn'>
            <span className="icon"> <Icon name={icon} /> </span>
            <span className="text"> {text} </span>
        </button>
    )
}

index.defaultProps = {
    icon: 'arrow left',
    text: 'Retour'
};



export default index;
