import React, { Fragment } from 'react'
import './home.scss'
import MainLogo from '../images/main-logo.png'

import Cta from '../components/cta'
import Footer from '../components/footer'

export default function Home() {
    return (
        <Fragment>
            <div className="main">
                <img src={MainLogo} className="main-logo" />
                <div className="cta-container">
                    <Cta link="/shop" clear={false}>
                        Shop Now!
                    </Cta>
                    <Cta link="/about" clear={true}>
                        Learn More
                    </Cta>
                </div>
                <div className="darkener"></div>
            </div>
            <Footer style={{ position: 'absolute', top: '100vh' }} />
        </Fragment>
    )
}
