import React from 'react'
import './style.less';

import { ReactComponent as Logo } from 'src/assets/images/logo.svg'
import { ReactComponent as WhiteLogo } from 'src/assets/images/white-logo.svg'

const SplashScreen = () => {

    console.log('hello')


   

    return (
        <div className = 'splash-screen'>
            <WhiteLogo />
            <Logo className = 'rotate' />
        </div>
    )
}

export default SplashScreen;
