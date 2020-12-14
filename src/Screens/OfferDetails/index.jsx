import React from 'react';
import { Parallax } from "react-parallax";
import { Link } from 'react-router-dom'
import BackButton from '../../Components/BackButton';
import Badge from '../../Components/Badge';
import './OfferDetails.less';

import img from './1.jpg';

const OfferDetails = () => (

    <div className='offer-details'>
        <div className="offer-details-header">
            <BackButton text='LA NOUVELLE PLATEFORME ANFA PLACE IPSUM LOREM' />
            <p>08 DÉC - 12 DÉC</p>
            <div className="offer-details-tags">
                <Link to='/'>
                    <Badge title='Tag' color='white' />
                </Link>
                <Link to='/'>
                    <Badge title='Tag' color='white' />
                </Link>
            </div>
        </div>

        <Parallax bgImage={img} blur={{ min: -1, max: 2 }}>
            <div style={{ height: 500 }}>
                <div>Dynamic Blur</div>
            </div>
        </Parallax>



        <Parallax
            strength={200}
            renderLayer={(percentage) => (
                <div>
                    <div
                        style={{
                            position: "absolute",
                            background: `rgba(255, 125, 0, ${percentage * 1})`,
                            left: "50%",
                            top: "50%",
                            borderRadius: "50%",
                            transform: "translate(-50%,-50%)",
                            width: percentage * 20,
                            height: percentage * 20
                        }}
                    />
                </div>
            )}
        >
            <div style={{ minHeight: '100vh' }}>
                hello
            </div>
        </Parallax>

    </div>
)

export default OfferDetails;
