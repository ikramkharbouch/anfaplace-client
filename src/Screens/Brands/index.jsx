import React, { useState } from 'react';
import { Input, Checkbox } from 'semantic-ui-react';
import BrandsGrid from 'src/Components/BrandsGrid';

import './Shops.less';

const Shops = () => {

	const [promo, setPromo] = useState(false);
	console.log(promo, setPromo);


	const handleClick = (e, data) => {
		console.log(data);
		setPromo(data.checked);
	}

	return (
		<div className="shops-screen-container">
			<div className="shops-screen-header">
				<div className="header-filter-group">
					<Input className="filter" placeholder="Filter" icon="search" />
				</div>
				<div className="header-checkbox-group">
					<Checkbox label="En promo" className="promo-checkbox" onClick={handleClick} />
				</div>
			</div>
			<div className="shops-screen-content">
				<BrandsGrid promo={promo} />
			</div>
		</div>
	);

}
export default Shops;
