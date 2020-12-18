import React, { useEffect } from 'react';
import { Parallax } from 'react-parallax';
import { Tab, Icon } from 'semantic-ui-react';
import BackButton from 'src/Components/BackButton/BackButton';
import OutlineButton from 'src/Components/OutlineButton';
import swatchImg from 'src/assets/images/brands/swatch-logo.svg';
/* import { ReactComponent as RecycleIcon } from 'src/assets/icons/google.svg';
 */import img from './1.jpg';


import './Brand.less';


const panes = [
    {
        menuItem: 'Détails du magasin',
        render: () => <Tab.Pane attached={false} className='brand-tab-content'>
            <div className="brand-tab-infos">
                <div className="brand-tab-block">
                    <Icon name='retweet' /> Niveau 1
                </div>
                <div className="brand-tab-block">
                    <Icon name='phone' />
                    <span>Tél. 05 22 00 33 00</span>

                </div>
            </div>
            <div className="brand-tab-actions">
                <OutlineButton icon='plus' />
                <OutlineButton icon='heart outline' />
            </div>
        </Tab.Pane>,
    },
    {
        menuItem: 'À propos',
        render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane>,
    },
]

const OfferDetails = () => {

    useEffect(() => {
        document.querySelector('.navBar').style.display = 'none';
        document.querySelector('.coupon-menu-container').style.display = 'none';
        document.querySelector('.bg-light-blue').style.display = 'none';
        return () => {
            document.querySelector('.navBar').style.display = 'flex';
            document.querySelector('.coupon-menu-container').style.display = 'block';
            document.querySelector('.bg-light-blue').style.display = 'block';
        }
    }, [])


    return (
        <div className="offer-details">
            <Parallax bgImage={img} strength={200}>
                <div className="offer-details-header">
                    <BackButton text="Shopping" />
                </div>
                <div className="parallax-content">
                    <img src={swatchImg} alt='' />
                </div>
            </Parallax>

            <div className="content description">
                <Tab className='toggle' menu={{ secondary: true, pointing: true }} panes={panes} />

            </div>

        </div>
    );
}

export default OfferDetails;
