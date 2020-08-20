import React, { Fragment } from 'react'
import './about.scss'
import Image from '../images/learn-more.jpg'
import WaveImage from '../images/waves.svg'

import Footer from '../components/footer'

export default function About() {
    return (
        <Fragment>
            <div className="about-main-container">
                <img src={WaveImage} alt="" className="waves" />
                <div className="learn-text-container">
                    <h1 className="heading">ABOUT</h1>
                    <p className="text">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Beatae non perspiciatis, repudiandae atque dolor modi
                        animi architecto quidem voluptates asperiores. Sapiente
                        voluptatem, architecto consequuntur quis voluptas facere
                        id, odit similique, corrupti exercitationem explicabo
                        vitae soluta! Facilis aliquid enim harum fugiat! eum
                        sapiente reiciendis! Voluptas, ut. Voluptate distinctio
                    </p>
                </div>
            </div>
            <Footer />
        </Fragment>
    )
}
