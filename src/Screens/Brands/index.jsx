import React, { useEffect } from 'react';
import { Input, Checkbox } from 'semantic-ui-react';
import BackButton from 'src/Components/BackButton/BackButton';
import BrandsGrid from 'src/Components/BrandsGrid';

import './Shops.less';

const Shops = () => {

    useEffect(() => {
        document.querySelector('.bottom-nav').style.display = 'none';
        return () => {
            document.querySelector('.bottom-nav').style.display = 'block';
        }
    }, []);


    return (
        <div className='shops-screen-container'>
            <div className="shops-screen-header">
                <div className="header-filter-group">
                    <BackButton text=' ' />
                    <Input className="filter" placeholder="Filter" icon="search" />
                </div>
                <div className="header-checkbox-group">
                    <Checkbox label='En promo' className='promo-checkbox' />
                </div>

            </div>
            <div className="shops-screen-content">
                <BrandsGrid />
            </div>
        </div>
    )
}
export default Shops;
