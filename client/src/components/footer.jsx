import React from 'react'
import './footer.scss'
import MasterCardIcon from '../images/mastercard.svg'

export default function Footer(props) {
    const year = new Date().getFullYear()

    return (
        <div className="footer" {...props}>
            <div className="payment-container">
                <img
                    src={MasterCardIcon}
                    alt="MasterCard"
                    className="image master-card"
                />
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                    alt="Visa"
                    className="image visa"
                />
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                    alt="Paypal"
                    className="image paypal"
                />
            </div>
            <div className="copyright">© {year}, Epsilon</div>
        </div>
    )
}
