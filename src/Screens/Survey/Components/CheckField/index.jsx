import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'semantic-ui-react';
import './CheckField.less';

const CheckField = ({ title, value, clicked, answer }) => {

    const handleClick = (e, data) => {
        clicked(data.value);
    };

    return (
        <Checkbox
            className="check-btn"
            label={{ children: title }}
            value={value}
            onClick={(e, data) => handleClick(e, data)}
            checked={answer === value}
        />
    )
}

CheckField.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    answer: PropTypes.number.isRequired,
    clicked: PropTypes.func.isRequired,
};

export default CheckField;
