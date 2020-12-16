import React from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as ArrowIcon } from '../../assets/icons/arrow.svg';

import './BackButton.less';

const index = ({ text }) => {
  const history = useHistory();

  const handleClick = () => history.goBack();

  return (
    <button type="button" onClick={handleClick} className="back-btn">
      <ArrowIcon className="icon" /> <span className="text"> {text} </span>
    </button>
  );
};

index.defaultProps = {
  icon: 'arrow left',
  text: 'Retour',
};

export default index;
