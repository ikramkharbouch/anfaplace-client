import React from 'react';
import './style.less';
import { Icon } from 'semantic-ui-react'

const Empty = ({ text = 'Aucune visite prévue' }) => (
    <div className = 'empty__block'>
        <p><Icon size = 'huge' name = 'inbox' /></p>
        <p>{text}</p>
    </div>
)
export default Empty;
