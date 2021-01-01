import React from 'react';
import CouponCard from 'src/Components/CouponCard';
import brandSrc from 'src/assets/images/brands/GO_Sport_logo.svg';
import swatchSrc from 'src/assets/images/brands/swatch-logo.svg';


import('./CouponList.less').then(() => console.log('css imported'));

const initialState = [
    { id: 1, url: `/couponList/1`, img: brandSrc, amount: '50dh', date: `03/04/2021`, points: '50 points', title: 'Go sport', available: true, active: true },
    { id: 2, url: `/couponList/2`, img: brandSrc, amount: '200dh', date: `03/04/2021`, points: 'Conpon gratuit', title: 'Go sport', available: true, active: false },
    { id: 3, url: `/couponList/3`, img: swatchSrc, amount: '500dh', date: `03/04/2021`, points: '500 points', title: 'Go sport', available: false, active: true }

]

const CouponList = () => (<div className='coupon-list__screen'>
    <h2 className="coupon-list__title"> Vous avez 50 points </h2>
    <div className="coupon-list__cards">
        {initialState.map(el => (
            <CouponCard key={el.id} url={el.url} img={el.img} amount={el.amount} date={el.date} points={el.points} available={el.available} title={el.title} active={el.active} couponInfos={el} />
        ))}
    </div>
    <div className="coupon-list__footer">
        <p className='coupon-list__footer-text'>
            <span className="red circle dot" />
            <span>Coupon bloqué</span>
        </p>
        <p className='coupon-list__footer-text'>
            <span className="green circle dot" />
            <span>Coupon disponible</span>
        </p>
    </div>

</div>)

export default CouponList;
